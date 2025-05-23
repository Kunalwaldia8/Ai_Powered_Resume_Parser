# In modules/resume_ranker.py

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_skill_match_score(resume_skills, job_skills):
    """Calculate skill match score between resume and job."""
    if not resume_skills or not job_skills:
        return 0.0
    
    # Convert skills to lowercase for better matching
    resume_skills_lower = [skill.lower() for skill in resume_skills]
    job_skills_lower = [skill.lower() for skill in job_skills]
    
    # Count matching skills
    matching_skills = set(resume_skills_lower).intersection(set(job_skills_lower))
    
    # Calculate match percentage based on job requirements
    match_score = len(matching_skills) / len(job_skills_lower) if job_skills_lower else 0
    
    return match_score * 100  # Return as percentage

def calculate_semantic_similarity(resume_text, job_description_text):
    """Calculate semantic similarity between resume and job description using cosine similarity."""
    if not resume_text or not job_description_text:
        return 0.0
    
    # Create a vectorizer
    vectorizer = CountVectorizer(stop_words='english')
    
    try:
        # Create the document-term matrix
        count_matrix = vectorizer.fit_transform([resume_text, job_description_text])
        
        # Calculate cosine similarity
        similarity = cosine_similarity(count_matrix)[0][1]
        return similarity * 100  # Return as percentage
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        return 0.0

def rank_resumes(resumes_data, job_description_text, job_skills):
    """Rank resumes based on their match with the job description."""
    # Calculate scores for each resume
    ranked_resumes = []
    
    for resume_path, resume_data in resumes_data.items():
        # Calculate skill match score (50% weight)
        skill_match = calculate_skill_match_score(resume_data["skills"], job_skills)
        
        # Calculate semantic similarity score (50% weight)
        semantic_score = calculate_semantic_similarity(resume_data["full_text"], job_description_text)
        
        # Calculate final score (weighted average)
        final_score = (skill_match * 0.8) + (semantic_score * 0.2)
        
        # Get resume file name without path
        resume_name = resume_data["filename"]
        
        # Get matching and missing skills
        resume_skills_lower = [skill.lower() for skill in resume_data["skills"]]
        job_skills_lower = [skill.lower() for skill in job_skills]
        matching_skills = list(set(resume_skills_lower).intersection(set(job_skills_lower)))
        missing_skills = list(set(job_skills_lower) - set(resume_skills_lower))
        
        ranked_resumes.append({
            "resume_name": resume_name,
            "candidate_name": resume_data["name"],
            "skills": resume_data["skills"],
            "matching_skills": matching_skills,
            "missing_skills": missing_skills,
            "skill_match_score": skill_match,
            "semantic_score": semantic_score,
            "final_score": final_score,
            "resume_path": resume_path,
            "contact": {
                "email": resume_data["email"],
                "phone": resume_data["phone"],
                "github": resume_data["github"],
                "linkedin": resume_data["linkedin"]
            },
            "education": resume_data["education"],
            "projects": resume_data.get("projects", [])
        })
    
    # Sort resumes by final score (descending)
    ranked_resumes.sort(key=lambda x: x["final_score"], reverse=True)
    
    # Add rank
    for i, resume in enumerate(ranked_resumes):
        resume["rank"] = i + 1
    
    return ranked_resumes
