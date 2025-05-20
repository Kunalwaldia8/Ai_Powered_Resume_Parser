import os
import uuid
from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import json

# Import our modules
from modules.document_processor import extract_text_from_pdf, extract_text_from_docx, process_resume
from modules.skill_extractor import extract_skills_from_text
from modules.resume_ranker import rank_resumes
from modules.report_generator import generate_html_report

app = Flask(__name__)

# Configure upload settings
UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
RESUME_FOLDER = os.path.join(UPLOAD_FOLDER, 'resumes')
JD_FOLDER = os.path.join(UPLOAD_FOLDER, 'job_descriptions')
ALLOWED_RESUME_EXTENSIONS = {'pdf', 'docx'}
ALLOWED_JD_EXTENSIONS = {'pdf', 'docx', 'txt'}

# Create upload directories if they don't exist
os.makedirs(RESUME_FOLDER, exist_ok=True)
os.makedirs(JD_FOLDER, exist_ok=True)

# Set maximum file size (16 MB)
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
    if 'resumes' not in request.files or 'job_description' not in request.files:
        return jsonify({'error': 'Missing files'}), 400
    
    # Create a unique session ID for this upload batch
    session_id = str(uuid.uuid4())
    session_resume_folder = os.path.join(RESUME_FOLDER, session_id)
    session_jd_folder = os.path.join(JD_FOLDER, session_id)
    
    os.makedirs(session_resume_folder, exist_ok=True)
    os.makedirs(session_jd_folder, exist_ok=True)
    
    # Process job description
    jd_file = request.files['job_description']
    if jd_file.filename == '':
        return jsonify({'error': 'No job description selected'}), 400
    
    if jd_file and allowed_jd_file(jd_file.filename):
        jd_filename = secure_filename(jd_file.filename)
        jd_path = os.path.join(session_jd_folder, jd_filename)
        jd_file.save(jd_path)
        
        # Extract text from job description
        if jd_filename.endswith('.pdf'):
            jd_text = extract_text_from_pdf(jd_path)
        elif jd_filename.endswith('.docx'):
            jd_text = extract_text_from_docx(jd_path)
        else:  # txt file
            with open(jd_path, 'r', encoding='utf-8', errors='ignore') as f:
                jd_text = f.read()
        
        # Extract skills from job description
        jd_skills = extract_skills_from_text(jd_text)
    else:
        return jsonify({'error': 'Invalid job description file format'}), 400
    
    # Process resumes
    resume_files = request.files.getlist('resumes')
    if not resume_files or resume_files[0].filename == '':
        return jsonify({'error': 'No resumes selected'}), 400
    
    resume_data = {}
    
    for resume_file in resume_files:
        if resume_file and allowed_resume_file(resume_file.filename):
            resume_filename = secure_filename(resume_file.filename)
            resume_path = os.path.join(session_resume_folder, resume_filename)
            resume_file.save(resume_path)
            
            try:
                # Process resume using your existing functions
                resume_info = process_resume(resume_path)
                resume_info['filename'] = resume_filename  # Add filename to the data
                resume_data[resume_path] = resume_info
            except Exception as e:
                print(f"Error processing resume {resume_filename}: {e}")
    
    if not resume_data:
        return jsonify({'error': 'No valid resume files uploaded'}), 400
    
    # Rank resumes
    ranked_resumes = rank_resumes(resume_data, jd_text, jd_skills)
    
    # Save results
    results_path = os.path.join(session_jd_folder, 'results.json')
    with open(results_path, 'w') as f:
        json.dump(ranked_resumes, f, indent=4)
    
    # Generate HTML report
    report_path = os.path.join(session_jd_folder, 'report.html')
    generate_html_report(ranked_resumes, report_path)
    
    return jsonify({
        'success': True,
        'session_id': session_id,
        'message': f'Successfully processed {len(resume_data)} resumes',
        'redirect': url_for('results', session_id=session_id)
    })

@app.route('/results/<session_id>')
def results(session_id):
    # Validate session_id to prevent directory traversal
    if not session_id or not all(c.isalnum() or c == '-' for c in session_id):
        return "Invalid session ID", 400
    
    results_path = os.path.join(JD_FOLDER, session_id, 'results.json')
    
    if not os.path.exists(results_path):
        return "Results not found", 404
    
    with open(results_path, 'r') as f:
        ranked_resumes = json.load(f)
    
    return render_template('results.html', 
                          ranked_resumes=ranked_resumes, 
                          session_id=session_id)

@app.route('/download_report/<session_id>')
def download_report(session_id):
    # Validate session_id to prevent directory traversal
    if not session_id or not all(c.isalnum() or c == '-' for c in session_id):
        return "Invalid session ID", 400
    
    report_path = os.path.join('job_descriptions', session_id)
    return send_from_directory(os.path.join(app.static_folder, 'uploads'), 
                              os.path.join(report_path, 'report.html'))

if __name__ == '__main__':
    app.run(debug=True)
