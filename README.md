# Resume Ranking System

A Flask-based web application that analyzes and ranks resumes against job descriptions using Natural Language Processing (NLP) and machine learning techniques.

## Features

- **Multi-format Support**:
  - Resumes: PDF, DOCX
  - Job Descriptions: PDF, DOCX, TXT
- **Advanced Analysis**:
  - Automated skill extraction
  - Skills matching against job requirements
  - Semantic similarity analysis
  - Weighted scoring system
- **User-Friendly Interface**:
  - Web-based upload interface
  - Interactive results viewing
  - Downloadable HTML reports
- **Security Features**:
  - File type validation
  - Session-based processing
  - Directory traversal prevention
  - File size limits (16MB)

## Prerequisites

- Python 3.8+
- Flask
- PyPDF2
- python-docx
- NLTK
- spaCy

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd resume-ranking-system
```

2. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate   # Windows
```

3. Install required packages:

```bash
pip install -r requirements.txt
```

## Project Structure

```
resume_ranking_system/
├── app.py                 # Main Flask application
├── requirements.txt       # Project dependencies
├── skills.txt            # Skills dictionary
├── modules/
│   ├── document_processor.py    # PDF/DOCX processing
│   ├── skill_extractor.py      # Skills extraction
│   ├── resume_ranker.py        # Resume ranking logic
│   └── report_generator.py     # HTML report generation
├── static/
│   └── uploads/
│       ├── resumes/           # Upload directory for resumes
│       └── job_descriptions/  # Upload directory for job descriptions
└── templates/
    ├── index.html            # Upload interface
    └── results.html          # Results display
```

## Usage

1. Start the Flask application:

```bash
python app.py
```

2. Open a web browser and navigate to `http://localhost:5000`

3. Upload files:

   - Select one or more resumes (PDF/DOCX)
   - Upload a job description (PDF/DOCX/TXT)
   - Click "Upload" to process

4. View Results:
   - See ranked list of candidates
   - Review skill matches and scores
   - Download detailed HTML report

## How It Works

1. **Document Processing**:

   - Extracts text from PDF/DOCX files
   - Segments documents into relevant sections

2. **Skills Analysis**:

   - Identifies technical skills from resumes and job descriptions
   - Matches skills against predefined skills dictionary
   - Calculates skill match percentages

3. **Ranking Algorithm**:

   - Computes skill match score (50% weight)
   - Calculates semantic similarity (50% weight)
   - Generates final weighted score
   - Ranks candidates based on overall score

4. **Report Generation**:
   - Creates detailed HTML reports
   - Highlights matching and missing skills
   - Includes contact information and scores

## Security Considerations

- File extensions are validated
- Upload directory is isolated
- Maximum file size is enforced (16MB)
- Session IDs are validated
- Directory traversal is prevented

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Flask for web framework
- PyPDF2 for PDF processing
- python-docx for DOCX handling
- NLTK and spaCy for NLP capabilities
