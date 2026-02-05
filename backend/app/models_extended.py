"""
Extended models for Career Guidance Platform
Includes: CareerPath, ExamPreparation, Job, Roadmap
"""
from app import db
from datetime import datetime


class CareerPath(db.Model):
    """Career paths (Engineering, Medical, Commerce, etc.)"""
    __tablename__ = 'career_paths'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(50))  # Emoji or icon identifier
    category = db.Column(db.String(100))  # 'Technical', 'Medical', 'Business', etc.
    required_stream = db.Column(db.String(50))  # 'Science', 'Commerce', 'Arts', 'Any'
    difficulty_level = db.Column(db.String(20))  # 'Easy', 'Medium', 'Hard'
    popularity_score = db.Column(db.Integer, default=0)
    
    # Relationships
    jobs = db.relationship('Job', backref='career_path', lazy=True)
    exam_preparations = db.relationship('ExamPreparation', backref='career_path', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'category': self.category,
            'required_stream': self.required_stream,
            'difficulty_level': self.difficulty_level,
            'popularity_score': self.popularity_score
        }


class ExamPreparation(db.Model):
    """Exam preparation paths (JEE, NEET, CUET, etc.)"""
    __tablename__ = 'exam_preparations'
    
    id = db.Column(db.Integer, primary_key=True)
    career_path_id = db.Column(db.Integer, db.ForeignKey('career_paths.id'))
    name = db.Column(db.String(200), nullable=False)  # 'JEE Main', 'NEET UG', etc.
    exam_type = db.Column(db.String(100))  # 'Engineering', 'Medical', 'Commerce'
    difficulty = db.Column(db.String(20))  # 'High', 'Medium', 'Low'
    timeline = db.Column(db.String(100))  # '2 years', '1 year', etc.
    required_subjects = db.Column(db.JSON)  # ['Physics', 'Chemistry', 'Mathematics']
    recommended_coaching = db.Column(db.Boolean, default=False)
    syllabus_overview = db.Column(db.Text)
    
    def to_dict(self):
        return {
            'id': self.id,
            'career_path_id': self.career_path_id,
            'name': self.name,
            'exam_type': self.exam_type,
            'difficulty': self.difficulty,
            'timeline': self.timeline,
            'required_subjects': self.required_subjects,
            'recommended_coaching': self.recommended_coaching,
            'syllabus_overview': self.syllabus_overview
        }


class Job(db.Model):
    """Job roles with Indian salary data"""
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    career_path_id = db.Column(db.Integer, db.ForeignKey('career_paths.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    
    # Salary in INR (Lakhs per annum)
    avg_salary_min = db.Column(db.Float)  # e.g., 6.0 for 6 LPA
    avg_salary_max = db.Column(db.Float)  # e.g., 15.0 for 15 LPA
    
    required_education = db.Column(db.String(200))  # 'B.Tech', 'MBBS', etc.
    required_skills = db.Column(db.JSON)  # ['Python', 'React', 'SQL']
    growth_rate = db.Column(db.String(20))  # 'High', 'Medium', 'Low'
    demand_level = db.Column(db.String(20))  # 'High', 'Medium', 'Low'
    work_environment = db.Column(db.String(100))  # 'Office', 'Hybrid', 'Remote'
    
    # Recruiter criteria for job fit scoring (Module 5)
    required_aptitude_level = db.Column(db.JSON)  # {'logical': 70, 'numerical': 60, ...}
    preferred_riasec_traits = db.Column(db.JSON)  # {'I': 0.5, 'R': 0.3, 'C': 0.2}
    acceptable_risk_tolerance = db.Column(db.String(50))  # 'conservative', 'moderate', 'aggressive'
    
    def to_dict(self):
        return {
            'id': self.id,
            'career_path_id': self.career_path_id,
            'title': self.title,
            'description': self.description,
            'avg_salary_min': self.avg_salary_min,
            'avg_salary_max': self.avg_salary_max,
            'salary_range': f'₹{self.avg_salary_min}-{self.avg_salary_max} LPA',
            'required_education': self.required_education,
            'required_skills': self.required_skills,
            'growth_rate': self.growth_rate,
            'demand_level': self.demand_level,
            'work_environment': self.work_environment,
            'required_aptitude_level': self.required_aptitude_level,
            'preferred_riasec_traits': self.preferred_riasec_traits,
            'acceptable_risk_tolerance': self.acceptable_risk_tolerance
        }


class Roadmap(db.Model):
    """Personalized academic and career roadmaps"""
    __tablename__ = 'roadmaps'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stage = db.Column(db.String(50), nullable=False)  # '9-10', '11-12', 'college'
    
    # Roadmap content as structured JSON
    content = db.Column(db.JSON, nullable=False)
    # Example structure:
    # {
    #   "current_year": { "tasks": [...], "milestones": [...] },
    #   "next_year": { "tasks": [...], "milestones": [...] },
    #   "future": { "goals": [...], "potential_careers": [...] }
    # }
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stage': self.stage,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
