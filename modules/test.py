import re
import os
from unittest import mock
import builtins

# Import the extraction functions
# Adjust these imports based on your project structure
try:
    from entity_extractor import extract_skills as entity_extract_skills
    from skill_extractor import extract_skills_from_text
except ImportError:
    # If running from a different directory
    import sys
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from entity_extractor import extract_skills as entity_extract_skills
    from skill_extractor import extract_skills_from_text

def input_handler(file_path):
    """Read resume data from a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

def test_with_sample_data():
    """Test extractors with predefined sample data"""
    sample_resume = """
    Name: Jane Smith
    Email: jane.smith@example.com
    Phone: +919876543210
    
    SKILLS
    - Proficient in Python, Java, and JavaScript
    - Experience with React and NodeJS
    - Database management with SQL and MongoDB
    - Version control using Git and GitHub
    - Knowledge of data structures and algorithms
    
    EDUCATION
    B.Tech in Computer Science, XYZ University
    
    PROJECTS
    - Developed a web application using React and NodeJS
    - Created a machine learning model for sentiment analysis
    """
    
    print("=== Testing with Sample Resume Data ===")
    
    # Test entity extractor
    entity_skills = entity_extract_skills(sample_resume)
    print(f"\nSkills extracted by entity_extractor:")
    print(entity_skills)
    
    # Test skill extractor
    skill_extractor_skills = extract_skills_from_text(sample_resume)
    print(f"\nSkills extracted by skill_extractor:")
    print(skill_extractor_skills)
    
    # Compare results
    print("\nComparison:")
    all_skills = set(entity_skills + skill_extractor_skills)
    print(f"Total unique skills found: {len(all_skills)}")
    print(f"Skills found by both extractors: {set(entity_skills) & set(skill_extractor_skills)}")
    print(f"Skills found only by entity_extractor: {set(entity_skills) - set(skill_extractor_skills)}")
    print(f"Skills found only by skill_extractor: {set(skill_extractor_skills) - set(entity_skills)}")

def test_with_file(resume_path):
    """Test extractors with a resume file"""
    resume_text = input_handler(resume_path)
    if not resume_text:
        return
    
    print(f"\n=== Testing with Resume File: {os.path.basename(resume_path)} ===")
    
    # Test entity extractor
    entity_skills = entity_extract_skills(resume_text)
    print(f"\nSkills extracted by entity_extractor:")
    print(entity_skills)
    
    # Test skill extractor
    skill_extractor_skills = extract_skills_from_text(resume_text)
    print(f"\nSkills extracted by skill_extractor:")
    print(skill_extractor_skills)
    
    # Compare results
    print("\nComparison:")
    all_skills = set(entity_skills + skill_extractor_skills)
    print(f"Total unique skills found: {len(all_skills)}")
    print(f"Skills found by both extractors: {set(entity_skills) & set(skill_extractor_skills)}")
    print(f"Skills found only by entity_extractor: {set(entity_skills) - set(skill_extractor_skills)}")
    print(f"Skills found only by skill_extractor: {set(skill_extractor_skills) - set(entity_skills)}")

def interactive_test():
    """Allow user to input a resume file path for testing"""
    with mock.patch.object(builtins, 'input', lambda _: input("Enter path to resume file: ")):
        file_path = input("")
        test_with_file(file_path)

if __name__ == "__main__":
    # Test with sample data first
    test_with_sample_data()
    
    # Ask if user wants to test with a file
    print("\nDo you want to test with a resume file? (y/n)")
    choice = input().lower()
    if choice == 'y':
        interactive_test()
