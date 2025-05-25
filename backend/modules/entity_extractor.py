import re
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# ------------ NAME EXTRACTION ----------------
def extract_name(text):
    # Use spaCy NER for PERSON entities in the first 10 lines
    lines = text.strip().split("\n")[:10]
    for line in lines:
        doc = nlp(line)
        for ent in doc.ents:
            if ent.label_ == "PERSON" and 2 <= len(ent.text.split()) <= 3:
                return ent.text.strip()
    # Fallback: regex for two consecutive capitalized words
    match = re.search(r"\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b", text)
    if match:
        return f"{match.group(1)} {match.group(2)}"
    return None

# ------------ EMAIL EXTRACTION ----------------
def extract_email(text):
    pattern = r"[a-zA-Z0-9._%+-]+[\s]*@[\s]*[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    matches = re.findall(pattern, text)
    if matches:
        # Remove spaces and return the first match
        return matches[0].replace(" ", "").strip()
    return None

# ------------ PHONE EXTRACTION ----------------
def extract_phone(text):
    # Indian and international formats
    pattern = r"(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{6,12}"
    matches = re.findall(pattern, text)
    # Filter for likely mobile numbers (at least 10 digits)
    for number in matches:
        digits = re.sub(r"\D", "", number)
        if len(digits) >= 10:
            return digits
    return None

# ------------ SKILL EXTRACTION ----------------
def extract_skills(text):
    from modules.skill_extractor import extract_skills_from_text
    return extract_skills_from_text(text)


# ------------ GITHUB EXTRACTION ----------------
def extract_github_url(text):
    pattern = r"(https?://)?(www\.)?github\.com/[a-zA-Z0-9_-]+"
    match = re.search(pattern, text.replace(" ", ""))
    return match.group(0) if match else None

def extract_linkedin_url(text):
    pattern = r"(https?://)?(www\.)?linkedin\.com/(in|pub)/[a-zA-Z0-9_-]+"
    match = re.search(pattern, text.replace(" ", ""))
    return match.group(0) if match else None

# ------------ EDUCATION EXTRACTION ----------------
def extract_education(text):
    course_keywords = [
        r"b\.?\s?tech", r"bachelor of technology", r"b\.?\s?e", r"bachelor of engineering",
        r"b\.?\s?sc", r"bachelor of science", r"bca", r"b\.?\s?c\.?\s?a\.?",
        r"m\.?\s?tech", r"master of technology", r"m\.?\s?e", r"master of engineering",
        r"m\.?\s?sc", r"master of science", r"mca", r"m\.?\s?c\.?\s?a\.?",
        r"ph\.?\s?d", r"high school", r"secondary school", r"senior secondary"
    ]
    text = text.lower()
    found_courses = set()
    for keyword in course_keywords:
        matches = re.findall(rf"\b{keyword}\b", text)
        for match in matches:
            clean = re.sub(r"[.\s]", "", match).upper()
            found_courses.add(clean)
    return list(found_courses) if found_courses else None


# ------------ PROJECTS EXTRACTION ----------------
def extract_projects(text):
    project_keywords = ["project", "clone", "system", "detection", "app", "application", "implementation"]
    lines = text.lower().split("\n")
    projects = []
    for i, line in enumerate(lines):
        if any(k in line for k in project_keywords):
            project_block = line
            # Append next two lines for description
            for j in range(1, 3):
                if i + j < len(lines):
                    project_block += " " + lines[i + j].strip()
            projects.append(project_block.strip())
    return projects if projects else None

