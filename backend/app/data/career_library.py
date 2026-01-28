"""Career Library - Detailed career information database"""

CAREER_LIBRARY = {
    "Software Engineer": {
        "category": "Technology",
        "overview": "Design, develop, and maintain software applications and systems",
        "day_in_life": {
            "morning": "Stand-up meeting, code review, planning sprint tasks",
            "afternoon": "Writing code, debugging, collaborating with team",
            "evening": "Testing, documentation, learning new technologies"
        },
        "required_skills": {
            "technical": ["Programming (Python/Java/JavaScript)", "Data Structures & Algorithms", 
                         "Git", "Databases", "System Design", "Testing"],
            "soft": ["Problem Solving", "Communication", "Teamwork", "Time Management", 
                    "Continuous Learning"]
        },
        "education": {
            "minimum": "Bachelor's in Computer Science or related field",
            "preferred": "Strong portfolio of projects, open source contributions",
            "certifications": ["AWS Certified Developer", "Google Cloud Professional"]
        },
        "salary": {
            "entry": "₹6-12 LPA",
            "mid": "₹12-25 LPA",
            "senior": "₹25-50+ LPA",
            "location_factor": "Bangalore/Hyderabad: +20%, Tier-2 cities: -15%"
        },
        "growth_path": [
            "Junior Software Engineer (0-2 years)",
            "Software Engineer (2-4 years)",
            "Senior Software Engineer (4-7 years)",
            "Tech Lead / Architect (7-10 years)",
            "Engineering Manager / Principal Engineer (10+ years)"
        ],
        "work_environment": {
            "setting": "Office or Remote",
            "hours": "Flexible, typically 40-50 hours/week",
            "travel": "Minimal",
            "stress_level": "Medium to High"
        },
        "pros": [
            "High demand and job security",
            "Excellent salary and benefits",
            "Remote work opportunities",
            "Continuous learning and innovation",
            "Global career opportunities"
        ],
        "cons": [
            "Rapidly changing technology landscape",
            "Can be stressful during deadlines",
            "Sedentary work",
            "Sometimes requires long hours",
            "Competitive job market"
        ],
        "success_factors": [
            "Strong problem-solving skills",
            "Passion for technology",
            "Continuous learning mindset",
            "Good communication skills",
            "Building a strong portfolio"
        ],
        "failure_reasons": [
            "Not keeping skills updated",
            "Poor communication with team",
            "Lack of problem-solving ability",
            "Not adapting to new technologies",
            "Burnout from overwork"
        ],
        "market_outlook": {
            "demand": "Very High",
            "growth_rate": "22% (2020-2030)",
            "automation_risk": "Low",
            "future_trends": ["AI/ML integration", "Cloud computing", "DevOps", "Cybersecurity"]
        },
        "personality_fit": {
            "riasec": ["I", "R", "C"],
            "traits": "Analytical, detail-oriented, problem-solver, continuous learner"
        }
    },
    
    "Data Scientist": {
        "category": "Technology & Analytics",
        "overview": "Extract insights from data using statistical analysis and machine learning",
        "day_in_life": {
            "morning": "Data exploration, stakeholder meetings, model review",
            "afternoon": "Building ML models, data cleaning, feature engineering",
            "evening": "Model evaluation, documentation, presenting findings"
        },
        "required_skills": {
            "technical": ["Python/R", "Statistics", "Machine Learning", "SQL", 
                         "Data Visualization", "Big Data tools"],
            "soft": ["Analytical Thinking", "Communication", "Business Acumen", 
                    "Curiosity", "Storytelling"]
        },
        "education": {
            "minimum": "Bachelor's in Computer Science, Statistics, Math, or related",
            "preferred": "Master's in Data Science, strong portfolio of projects",
            "certifications": ["Google Data Analytics", "AWS ML Specialty", "TensorFlow Developer"]
        },
        "salary": {
            "entry": "₹8-15 LPA",
            "mid": "₹15-30 LPA",
            "senior": "₹30-60+ LPA",
            "location_factor": "Bangalore/Mumbai: +25%"
        },
        "growth_path": [
            "Junior Data Scientist (0-2 years)",
            "Data Scientist (2-5 years)",
            "Senior Data Scientist (5-8 years)",
            "Lead Data Scientist / ML Engineer (8-12 years)",
            "Data Science Manager / Chief Data Officer (12+ years)"
        ],
        "work_environment": {
            "setting": "Office or Remote",
            "hours": "Flexible, 40-50 hours/week",
            "travel": "Occasional for client meetings",
            "stress_level": "Medium"
        },
        "pros": [
            "High demand and excellent pay",
            "Intellectually stimulating work",
            "Impact on business decisions",
            "Diverse industry applications",
            "Remote work friendly"
        ],
        "cons": [
            "Requires strong math/stats background",
            "Data cleaning can be tedious",
            "Stakeholder management challenges",
            "Rapidly evolving field",
            "High expectations for ROI"
        ],
        "success_factors": [
            "Strong statistical foundation",
            "Programming proficiency",
            "Business understanding",
            "Communication skills",
            "Continuous learning"
        ],
        "failure_reasons": [
            "Weak math/stats foundation",
            "Poor communication of insights",
            "Not understanding business context",
            "Overcomplicating solutions",
            "Ignoring data quality"
        ],
        "market_outlook": {
            "demand": "Very High",
            "growth_rate": "31% (2020-2030)",
            "automation_risk": "Low",
            "future_trends": ["AutoML", "MLOps", "Ethical AI", "Real-time analytics"]
        },
        "personality_fit": {
            "riasec": ["I", "C"],
            "traits": "Analytical, curious, detail-oriented, patient, logical"
        }
    },
    
    "UX Designer": {
        "category": "Design & Technology",
        "overview": "Create user-centered digital experiences through research and design",
        "day_in_life": {
            "morning": "User research review, design critique, stakeholder sync",
            "afternoon": "Wireframing, prototyping, user testing",
            "evening": "Design iteration, documentation, portfolio update"
        },
        "required_skills": {
            "technical": ["Figma/Sketch", "Prototyping", "User Research", "Wireframing", 
                         "Design Systems", "HTML/CSS basics"],
            "soft": ["Empathy", "Communication", "Collaboration", "Critical Thinking", 
                    "Storytelling"]
        },
        "education": {
            "minimum": "Bachelor's in Design, HCI, or related field",
            "preferred": "Strong portfolio, bootcamp certification",
            "certifications": ["Google UX Design", "Nielsen Norman Group UX"]
        },
        "salary": {
            "entry": "₹4-8 LPA",
            "mid": "₹8-18 LPA",
            "senior": "₹18-35 LPA",
            "location_factor": "Bangalore/Mumbai: +20%"
        },
        "growth_path": [
            "Junior UX Designer (0-2 years)",
            "UX Designer (2-4 years)",
            "Senior UX Designer (4-7 years)",
            "Lead UX Designer / UX Manager (7-10 years)",
            "Head of Design / Design Director (10+ years)"
        ],
        "work_environment": {
            "setting": "Office or Remote",
            "hours": "Flexible, 40-45 hours/week",
            "travel": "Occasional for user research",
            "stress_level": "Medium"
        },
        "pros": [
            "Creative and impactful work",
            "Growing demand",
            "Remote work opportunities",
            "Diverse projects",
            "User-focused mission"
        ],
        "cons": [
            "Subjective feedback",
            "Tight deadlines",
            "Stakeholder conflicts",
            "Portfolio pressure",
            "Competitive field"
        ],
        "success_factors": [
            "Strong portfolio",
            "User empathy",
            "Design thinking skills",
            "Communication ability",
            "Staying updated with trends"
        ],
        "failure_reasons": [
            "Weak portfolio",
            "Ignoring user research",
            "Poor communication",
            "Not iterating designs",
            "Ego over user needs"
        ],
        "market_outlook": {
            "demand": "High",
            "growth_rate": "13% (2020-2030)",
            "automation_risk": "Low",
            "future_trends": ["Voice UI", "AR/VR design", "Accessibility", "Design systems"]
        },
        "personality_fit": {
            "riasec": ["A", "I", "S"],
            "traits": "Creative, empathetic, detail-oriented, collaborative"
        }
    }
    
    # Add 20+ more careers...
}


def get_career_details(career_name):
    """Get detailed information about a career"""
    return CAREER_LIBRARY.get(career_name, None)


def search_careers(query=None, category=None, riasec_code=None):
    """Search careers by various criteria"""
    results = []
    
    for name, details in CAREER_LIBRARY.items():
        match = True
        
        if query and query.lower() not in name.lower():
            match = False
        
        if category and details.get('category') != category:
            match = False
        
        if riasec_code and riasec_code not in details.get('personality_fit', {}).get('riasec', []):
            match = False
        
        if match:
            results.append({
                'name': name,
                'category': details.get('category'),
                'overview': details.get('overview'),
                'salary_range': details.get('salary', {}).get('mid', 'N/A')
            })
    
    return results
