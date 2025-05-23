# modules/skill_extractor.py

import re
import os
import string

def load_skill_list():
    """Load skills from skills.txt file with regex patterns."""
    skills_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'skills.txt')
    try:
        with open(skills_path, 'r', encoding='utf-8') as f:
            skills = [line.strip().lower() for line in f if line.strip()]
            # Create regex patterns that account for hyphens and word boundaries
            return [
                re.sub(r'\s+', r'\\s+[-.]?\\s*', re.escape(skill)) 
                for skill in skills
            ]
    except FileNotFoundError:
        print(f"Warning: skills.txt not found. Using default skills.")
        return [
            r"machine\s+learning", "python", "java", "javascript", 
            "sql", "aws", "docker", "react", "django", "flask",
            "azure", "agile", "jira"
        ]

def extract_skills_from_text(text):
    """Advanced skill extraction with regex patterns."""
    if not text:
        return []
    
    text = text.lower()
    
    # Improved punctuation handling
    text = re.sub(r'(?<!\w)[!\"#$%&\'()*+,\/:;<=>?@[\\\]^_`{|}~](?!\w)', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Find matches using regex patterns
    skill_patterns = load_skill_list()
    found_skills = set()
    
    for pattern in skill_patterns:
        matches = re.finditer(rf'\b({pattern})\b', text, flags=re.IGNORECASE)
        for match in matches:
            # Normalize matched text (remove extra hyphens/spaces)
            skill = re.sub(r'[\s.-]+', ' ', match.group(0)).strip()
            found_skills.add(skill)
    
    # Return sorted by first occurrence in text
    return sorted(found_skills, key=lambda x: text.index(x))

# Test with your sample
if __name__ == "__main__":
    sample_resume_text = """
    Experienced software engineer skilled in machine learning,Python, Java, and AWS.
    Collaborated in Agile teams using Jira and machine learning.
    """
    print("Extracted Skills:")
    print(extract_skills_from_text(sample_resume_text))
