"""Career roadmap data and generator"""

# Career roadmap templates
CAREER_ROADMAPS = {
    "Software Engineer": {
        "step_1": {
            "title": "Pick Your First Language",
            "description": "Start with Python or Java. Focus on syntax, variables, loops, and basic logic.",
            "duration": "1-2 months"
        },
        "step_2": {
            "title": "Master DSA (Data Structures & Algorithms)",
            "description": "Build strong logic using Arrays, Strings, Trees, and Graphs. Practice on LeetCode.",
            "duration": "3-6 months"
        },
        "step_3": {
            "title": "Build Real Projects",
            "description": "Create a full-stack web app or a mobile app. Show your skills in a portfolio.",
            "duration": "Ongoing"
        },
        "step_4": {
            "title": "Internships & Placements",
            "description": "Apply for summer internships, prepare your resume, and practice system design.",
            "duration": "Final Year"
        }
    },
    
    "Data Scientist": {
        "year_1": {
            "focus": "Mathematics & Programming Foundation",
            "academics": ["Statistics", "Linear Algebra", "Probability", "Python"],
            "skills": ["Python", "NumPy", "Pandas", "Matplotlib"],
            "projects": ["Data analysis projects", "Kaggle competitions"],
            "certifications": ["Google Data Analytics"],
            "milestones": ["Complete 5 Kaggle datasets", "Build portfolio"]
        },
        "year_2": {
            "focus": "Machine Learning",
            "academics": ["Machine Learning", "Deep Learning", "NLP"],
            "skills": ["Scikit-learn", "TensorFlow", "Feature Engineering"],
            "projects": ["Prediction models", "Classification tasks", "Recommendation system"],
            "internships": ["Data analyst internship"],
            "certifications": ["Andrew Ng ML Course"]
        },
        "year_3": {
            "focus": "Advanced ML & Deployment",
            "academics": ["Big Data", "Cloud Computing"],
            "skills": ["PyTorch", "MLOps", "Docker", "AWS/GCP"],
            "projects": ["End-to-end ML pipeline", "Deployed model"],
            "internships": ["Data scientist internship"],
            "networking": ["Kaggle competitions", "ML conferences"]
        },
        "year_4": {
            "focus": "Specialization & Placement",
            "preparation": ["Portfolio projects", "Research papers", "Interview prep"],
            "targets": ["Tech giants", "AI startups", "Research labs"],
            "salary_range": "₹8-30 LPA",
            "growth_path": ["Junior DS → DS → Senior DS → Lead DS → Manager"]
        }
    },
    
    "UX Designer": {
        "year_1": {
            "focus": "Design Fundamentals",
            "academics": ["Design Thinking", "HCI", "Psychology"],
            "skills": ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
            "projects": ["App redesigns", "Website mockups", "Case studies"],
            "certifications": ["Google UX Design Certificate"],
            "milestones": ["Build design portfolio", "Dribbble presence"]
        },
        "year_2": {
            "focus": "User Research & Testing",
            "academics": ["User Research Methods", "Interaction Design"],
            "skills": ["User interviews", "Usability testing", "A/B testing"],
            "projects": ["User research projects", "Redesign with data"],
            "internships": ["UX intern at startup/agency"],
            "certifications": ["Nielsen Norman Group UX"]
        },
        "year_3": {
            "focus": "Advanced UX & Specialization",
            "academics": ["Advanced Prototyping", "Design Systems"],
            "skills": ["Framer", "Design systems", "Accessibility"],
            "projects": ["Complete UX case studies", "Design system"],
            "internships": ["UX designer internship"],
            "networking": ["Behance", "Design conferences"]
        },
        "year_4": {
            "focus": "Portfolio & Placement",
            "preparation": ["Polish portfolio", "Case study presentations"],
            "targets": ["Product companies", "Design agencies", "Startups"],
            "salary_range": "₹4-18 LPA",
            "growth_path": ["Junior UX → UX Designer → Senior UX → Lead → Manager"]
        }
    },
    
    # Add more careers...
}


def generate_personalized_roadmap(career, user_profile):
    """Generate personalized roadmap based on user profile"""
    base_roadmap = CAREER_ROADMAPS.get(career, CAREER_ROADMAPS["Software Engineer"])
    
    # Customize based on user's current skills and interests
    personalized = base_roadmap.copy()
    
    # Add recommendations based on profile
    if user_profile.get('riasec'):
        dominant = max(user_profile['riasec'], key=user_profile['riasec'].get)
        
        # Adjust focus areas based on personality
        if dominant == 'I':  # Investigative
            personalized['year_1']['additional_focus'] = "Research and analysis"
        elif dominant == 'A':  # Artistic
            personalized['year_1']['additional_focus'] = "Creative projects"
        elif dominant == 'E':  # Enterprising
            personalized['year_1']['additional_focus'] = "Leadership and networking"
    
    return personalized
