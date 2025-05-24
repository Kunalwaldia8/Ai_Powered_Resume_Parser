# In modules/report_generator.py

def generate_html_report(ranked_resumes, output_path):
    """Generate an HTML report for the ranked resumes."""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Resume Ranking Results</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .container { max-width: 1200px; margin: 0 auto; }
            h1 { color: #2c3e50; }
            .resume-card { 
                border: 1px solid #ddd; 
                border-radius: 8px; 
                padding: 15px; 
                margin-bottom: 20px;
                background-color: #f9f9f9;
            }
            .top-resume { background-color: #e8f5e9; }
            .score { 
                font-size: 24px; 
                font-weight: bold; 
                color: #1976d2;
            }
            .skills-list { 
                display: flex; 
                flex-wrap: wrap; 
                gap: 8px;
            }
            .skill {
                background-color: #e3f2fd;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 14px;
            }
            .missing-skill {
                background-color: #ffebee;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 14px;
            }
            .rank-badge {
                display: inline-block;
                width: 30px;
                height: 30px;
                background-color: #1976d2;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                margin-right: 10px;
            }
            .contact-info {
                margin-top: 10px;
                font-size: 14px;
            }
            .education-info {
                margin-top: 10px;
            }
            .projects-info {
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Resume Ranking Results</h1>
    """
    
    # Add each resume card
    for resume in ranked_resumes:
        top_class = " top-resume" if resume["rank"] <= 3 else ""
        
        html += f"""
            <div class="resume-card{top_class}">
                <h2><span class="rank-badge">{resume["rank"]}</span>{resume["candidate_name"] or "Unknown Candidate"}</h2>
                <p>Resume: <strong>{resume["resume_name"]}</strong></p>
                <p>Score: <span class="score">{resume["final_score"]:.2f}%</span></p>
                <p>Skill Match: {resume["skill_match_score"]:.2f}% | Semantic Match: {resume["semantic_score"]:.2f}%</p>
                
                <h3>Contact Information:</h3>
                <div class="contact-info">
        """
        
        # Add contact info
        contact = resume["contact"]
        if contact["email"]:
            html += f'<p>Email: {contact["email"]}</p>'
        if contact["phone"]:
            html += f'<p>Phone: {contact["phone"]}</p>'
        if contact["github"]:
            html += f'<p>GitHub: {contact["github"]}</p>'
        if contact["linkedin"]:
            html += f'<p>LinkedIn: {contact["linkedin"]}</p>'
        
        html += """
                </div>
                
                <h3>Matching Skills:</h3>
                <div class="skills-list">
        """
        
        # Add matching skills
        for skill in resume["matching_skills"]:
            html += f'<span class="skill">{skill}</span>'
        
        html += """
                </div>
                
                <h3>Missing Skills:</h3>
                <div class="skills-list">
        """
        
        # Add missing skills
        for skill in resume["missing_skills"]:
            html += f'<span class="missing-skill">{skill}</span>'
        
        html += """
                </div>
        """
        
        # Add education if available
        if resume.get("education"):
            html += """
                <h3>Education:</h3>
                <div class="education-info">
            """
            
            for edu in resume["education"]:
                html += f'<p>{edu}</p>'
                
            html += """
                </div>
            """
        
        # Add projects if available
        if resume.get("projects"):
            html += """
                <h3>Projects:</h3>
                <div class="projects-info">
            """
            
            for project in resume["projects"]:
                html += f'<p>{project}</p>'
                
            html += """
                </div>
            """
        
        html += """
            </div>
        """
    
    html += """
        </div>
    </body>
    </html>
    """
    
    # Save HTML report
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
