# In modules/document_processor.py

import os
from PyPDF2 import PdfReader
import docx
import sys
import importlib.util

# Handle imports more robustly
try:
    # Try relative import first
    from .entity_extractor import (
        extract_name, extract_email, extract_phone, extract_skills,
        extract_github_url, extract_linkedin_url, extract_education, extract_projects
    )
except (ImportError, ValueError):
    # If that fails, try to import from the parent directory
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from entity_extractor import (
        extract_name, extract_email, extract_phone, extract_skills,
        extract_github_url, extract_linkedin_url, extract_education, extract_projects
    )

def extract_text_from_pdf(file_path):
    """Extract text content from a PDF file."""
    text = ''
    try:
        with open(file_path, 'rb') as f:
            reader = PdfReader(f)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
    return text

def extract_text_from_docx(file_path):
    """Extract text content from a DOCX file."""
    text = ''
    try:
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + '\n'
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
    return text

def process_resume(file_path):
    """Process a single resume and extract all relevant information."""
    ext = os.path.splitext(file_path)[1].lower()
    
    # Extract text based on file type
    if ext == '.pdf':
        text = extract_text_from_pdf(file_path)
    elif ext == '.docx':
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError(f"Unsupported file format: {ext}")
    
    # Extract all information using your entity extractor functions
    extracted_data = {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "github": extract_github_url(text),
        "linkedin": extract_linkedin_url(text),
        "education": extract_education(text),
        "projects": extract_projects(text),
        "full_text": text  # Store full text for semantic matching
    }
    
    return extracted_data
