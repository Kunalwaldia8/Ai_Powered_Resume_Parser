# In modules/skill_extractor.py

import re
import os
import sys

# Try to import spacy
try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except:
        import subprocess
        subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
        nlp = spacy.load("en_core_web_sm")
except ImportError:
    print("Warning: spaCy not installed. Using simplified skill extraction.")
    nlp = None

# Try to import entity_extractor
try:
    from .entity_extractor import extract_skills as entity_extract_skills
except (ImportError, ValueError):
    try:
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        from entity_extractor import extract_skills as entity_extract_skills
    except ImportError:
        print("Warning: entity_extractor module not found. Using simplified skill extraction.")
        entity_extract_skills = None

def load_skill_list():
    """Load skills from skills.txt file."""
    skills_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'skills.txt')
    try:
        with open(skills_path, 'r') as f:
            return [line.strip().lower() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"Warning: skills.txt file not found at {skills_path}. Using a minimal default skill list.")
        # Fallback to a minimal list if file not found
        return ["python", "java", "javascript", "html", "css", "sql", "aws", 
                "docker", "react", "angular", "node.js", "django", "flask"]

def extract_skills_from_text(text):
    """Extract skills from text using NLP and pattern matching."""
    # If we have the entity_extractor function, use it
    if entity_extract_skills:
        return entity_extract_skills(text)
    
    # Otherwise, use our simplified implementation
    if not text:
        return []
    
    # Load skill list
    skill_list = load_skill_list()
    
    # Convert to lowercase for better matching
    text_lower = text.lower()
    
    extracted_skills = []
    
    # Direct matching of skills
    for skill in skill_list:
        if re.search(r'\b' + re.escape(skill) + r'\b', text_lower):
            extracted_skills.append(skill)
    
    # Use spaCy if available
    if nlp:
        doc = nlp(text_lower)
        
        # Extract skills using noun chunks
        for chunk in doc.noun_chunks:
            if any(skill in chunk.text.lower() for skill in skill_list):
                extracted_skills.append(chunk.text.strip())
    
    # Clean and normalize skills
    cleaned_skills = []
    for skill in extracted_skills:
        # Remove extra whitespace and common words
        skill = re.sub(r'\s+', ' ', skill).strip()
        skill = re.sub(r'^(and|or|the|a|an|in|with|using)\s+', '', skill)
        if len(skill) > 2:  # Ignore very short skills
            cleaned_skills.append(skill)
    
    # Remove duplicates while preserving order
    unique_skills = []
    for skill in cleaned_skills:
        if skill not in unique_skills:
            unique_skills.append(skill)
    
    return unique_skills
