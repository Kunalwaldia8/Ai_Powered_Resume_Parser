# Resume Ranking System - Backend

A Flask-based RESTful API that powers the Resume Ranking System, providing intelligent resume analysis and ranking capabilities using Natural Language Processing (NLP) techniques.

## Features

- **Intelligent Resume Processing**:

  - Smart skill extraction and categorization
  - Context-aware skill matching
  - Advanced ranking algorithm with customizable weights
  - Comprehensive result analysis

- **Document Processing**:

  - Support for PDF and DOCX formats
  - Robust text extraction
  - Section-wise content analysis
  - Contact information extraction

- **API Endpoints**:

  - File upload handling
  - Resume parsing and analysis
  - Skill categorization
  - Result generation and ranking

- **Security & Performance**:
  - Session-based processing
  - Secure file handling
  - Asynchronous processing support
  - Input validation and sanitization

## Tech Stack

- Python 3.8+
- Flask (Web Framework)
- spaCy (NLP)
- PyPDF2 (PDF Processing)
- python-docx (DOCX Processing)
- NLTK (Natural Language Processing)

## Getting Started

### Prerequisites

1. Python 3.8 or higher
2. pip (Python package manager)
3. Virtual environment (recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd resume-ranking-system/backend
```

2. Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
.\venv\Scripts\activate   # Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Download required NLTK data:

```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('averaged_perceptron_tagger'); nltk.download('stopwords')"
```

5. Start the server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Upload Files

- **POST** `/upload`
  - Accepts multiple resumes and a job description
  - Returns session ID and extracted skills

### Categorize Skills

- **POST** `/categorize_skills`
  - Accept skill categories (Required/Essential/Good to Have)
  - Returns ranked results

### Get Results

- **GET** `/results/<session_id>`
  - Retrieve ranking results for a session

## Project Structure

```
backend/
├── app.py                     # Main Flask application
├── requirements.txt           # Python dependencies
├── modules/
│   ├── document_processor.py  # Document parsing logic
│   ├── skill_extractor.py    # Skill extraction module
│   ├── resume_ranker.py      # Ranking algorithm
│   └── utils.py              # Utility functions
├── static/
│   └── uploads/              # File upload directory
│       ├── resumes/
│       └── job_descriptions/
└── templates/                 # HTML templates for reports
```

## How It Works

1. **Document Processing**

   - Extracts text from uploaded documents
   - Identifies document sections
   - Extracts contact information

2. **Skill Analysis**

   - Uses NLP to identify technical skills
   - Matches against known skill patterns
   - Considers skill context and relevance

3. **Ranking Process**

   - Weighs skills based on categories
   - Calculates skill match scores
   - Generates comprehensive ranking

4. **Result Generation**
   - Creates detailed analysis reports
   - Provides skill match breakdowns
   - Includes missing skills analysis

## Development

### Running Tests

```bash
python -m pytest tests/
```

### Code Style

We follow PEP 8 guidelines. Run the linter:

```bash
flake8 .
```

## Environment Variables

Create a `.env` file with:

```env
FLASK_ENV=development
UPLOAD_FOLDER=static/uploads
MAX_CONTENT_LENGTH=16777216  # 16MB in bytes
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Submit a pull request

## License

MIT License - See LICENSE file for details
