import os
import uuid
from flask import Flask, render_template, request, jsonify, send_from_directory, url_for
from werkzeug.utils import secure_filename
import json
import logging
logging.basicConfig(level=logging.INFO)

# Import our modules
from flask_cors import CORS
from modules.document_processor import extract_text_from_pdf, extract_text_from_docx, process_resume
from modules.skill_extractor import extract_skills_from_text
from modules.resume_ranker import rank_resumes_weighted
from modules.report_generator import generate_html_report

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
RESUME_FOLDER = os.path.join(UPLOAD_FOLDER, 'resumes')
JD_FOLDER = os.path.join(UPLOAD_FOLDER, 'job_descriptions')
ALLOWED_RESUME_EXTENSIONS = {'pdf', 'docx'}
ALLOWED_JD_EXTENSIONS = {'pdf', 'docx', 'txt'}

os.makedirs(RESUME_FOLDER, exist_ok=True)
os.makedirs(JD_FOLDER, exist_ok=True)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_resume_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_RESUME_EXTENSIONS

def allowed_jd_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_JD_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    try:
        if 'resumes' not in request.files or 'job_description' not in request.files:
            app.logger.error('Missing files in upload')
            return jsonify({'error': 'Missing files'}), 400

        session_id = str(uuid.uuid4())
        session_resume_folder = os.path.join(RESUME_FOLDER, session_id)
        session_jd_folder = os.path.join(JD_FOLDER, session_id)
        os.makedirs(session_resume_folder, exist_ok=True)
        os.makedirs(session_jd_folder, exist_ok=True)

        # Process job description
        jd_file = request.files['job_description']
        if jd_file.filename == '':
            app.logger.error('No job description selected')
            return jsonify({'error': 'No job description selected'}), 400

        if jd_file and allowed_jd_file(jd_file.filename):
            jd_filename = secure_filename(jd_file.filename)
            jd_path = os.path.join(session_jd_folder, jd_filename)
            jd_file.save(jd_path)

            if jd_filename.endswith('.pdf'):
                jd_text = extract_text_from_pdf(jd_path)
            elif jd_filename.endswith('.docx'):
                jd_text = extract_text_from_docx(jd_path)
            else:
                with open(jd_path, 'r', encoding='utf-8', errors='ignore') as f:
                    jd_text = f.read()

            jd_skills = extract_skills_from_text(jd_text)
            app.logger.info(f"Extracted skills: {jd_skills}")
            if not jd_skills:
                app.logger.error('No skills extracted from job description!')
                return jsonify({'error': 'No skills could be extracted from the job description.'}), 400
            # Save jd_skills for later use
            jd_skills_file = os.path.join(session_jd_folder, 'jd_skills.json')
            with open(jd_skills_file, 'w') as f:
                json.dump(jd_skills, f)
            if not os.path.exists(jd_skills_file):
                app.logger.error(f"Failed to create jd_skills.json at {jd_skills_file}")
                return jsonify({'error': 'Failed to save extracted skills.'}), 500
            else:
                app.logger.info(f"jd_skills.json created at {jd_skills_file}")
        else:
            app.logger.error('Invalid job description file format')
            return jsonify({'error': 'Invalid job description file format'}), 400

        # Process resumes
        resume_files = request.files.getlist('resumes')
        if not resume_files or resume_files[0].filename == '':
            app.logger.error('No resumes selected')
            return jsonify({'error': 'No resumes selected'}), 400

        for resume_file in resume_files:
            if resume_file and allowed_resume_file(resume_file.filename):
                resume_filename = secure_filename(resume_file.filename)
                resume_path = os.path.join(session_resume_folder, resume_filename)
                resume_file.save(resume_path)

        # Return JSON with redirect URL
        return jsonify({
            'success': True,
            'session_id': session_id,
            'redirect': url_for('categorize_skills_page', session_id=session_id)
        })
    except Exception as e:
        app.logger.error(f"Error in /upload: {e}")
        import traceback; traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/categorize_skills/<session_id>')
def categorize_skills_page(session_id):
    session_resume_folder = os.path.join(RESUME_FOLDER, session_id)
    session_jd_folder = os.path.join(JD_FOLDER, session_id)
    jd_skills_path = os.path.join(session_jd_folder, 'jd_skills.json')
    if not os.path.exists(jd_skills_path):
        return "Job description skills not found.", 404
    with open(jd_skills_path, 'r') as f:
        jd_skills = json.load(f)
    return render_template(
        'categorize_skills.html',
        jd_skills=jd_skills,
        session_id=session_id,
        resume_folder=session_resume_folder,
        jd_folder=session_jd_folder,
    )

@app.route('/categorize_skills', methods=['POST'])
def categorize_skills():
    data = request.get_json()
    session_id = data['session_id']
    skill_categories = data['skill_categories']
    session_resume_folder = os.path.join(RESUME_FOLDER, session_id)
    session_jd_folder = os.path.join(JD_FOLDER, session_id)
    jd_text_path = os.path.join(session_jd_folder, os.listdir(session_jd_folder)[0])  # Only one JD file

    # Load JD text
    if jd_text_path.endswith('.pdf'):
        jd_text = extract_text_from_pdf(jd_text_path)
    elif jd_text_path.endswith('.docx'):
        jd_text = extract_text_from_docx(jd_text_path)
    else:
        with open(jd_text_path, 'r', encoding='utf-8', errors='ignore') as f:
            jd_text = f.read()

    category_weights = {"required": 3, "essential": 2, "good_to_have": 1}

    # Process resumes
    resume_data = {}
    for resume_filename in os.listdir(session_resume_folder):
        resume_path = os.path.join(session_resume_folder, resume_filename)
        try:
            resume_info = process_resume(resume_path)
            resume_info['filename'] = resume_filename
            resume_data[resume_path] = resume_info
        except Exception as e:
            print(f"Error processing resume {resume_filename}: {e}")

    # Rank resumes using the new weighted scoring
    ranked_resumes = rank_resumes_weighted(
        resume_data, jd_text, skill_categories, category_weights
    )

    # Save and render results
    results_path = os.path.join(session_jd_folder, 'results.json')
    with open(results_path, 'w') as f:
        json.dump(ranked_resumes, f, indent=4)
    report_path = os.path.join(session_jd_folder, 'report.html')
    generate_html_report(ranked_resumes, report_path)
    return jsonify({'ranked_resumes': ranked_resumes})


@app.route('/results/<session_id>')
def results(session_id):
    if not session_id or not all(c.isalnum() or c == '-' for c in session_id):
        return "Invalid session ID", 400

    results_path = os.path.join(JD_FOLDER, session_id, 'results.json')
    if not os.path.exists(results_path):
        return "Results not found", 404

    with open(results_path, 'r') as f:
        ranked_resumes = json.load(f)

    return render_template('results.html', ranked_resumes=ranked_resumes, session_id=session_id)

@app.route('/download_report/<session_id>')
def download_report(session_id):
    if not session_id or not all(c.isalnum() or c == '-' for c in session_id):
        return "Invalid session ID", 400

    report_path = os.path.join('job_descriptions', session_id)
    return send_from_directory(os.path.join(app.static_folder, 'uploads'), os.path.join(report_path, 'report.html'))
@app.route('/api/session_info/<session_id>', methods=['GET'])
def get_session_info(session_id):
    session_jd_folder = os.path.join(JD_FOLDER, session_id)
    jd_skills_path = os.path.join(session_jd_folder, 'jd_skills.json')
    app.logger.info(f"Looking for jd_skills.json at {jd_skills_path}")
    if not os.path.exists(jd_skills_path):
        app.logger.error(f"jd_skills.json not found at {jd_skills_path}")
        return jsonify({'error': 'Job description skills not found.'}), 404
    with open(jd_skills_path, 'r') as f:
        jd_skills = json.load(f)
    return jsonify({
        'session_id': session_id,
        'jd_skills': jd_skills
    })

if __name__ == '__main__':
    app.run(debug=True)
