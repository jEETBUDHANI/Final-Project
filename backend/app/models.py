from app import db
from datetime import datetime
import bcrypt

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Academic stage tracking for student guidance
    academic_stage = db.Column(db.String(50))  # '9-10', '11-12', 'college', 'working'
    current_stream = db.Column(db.String(50))  # 'Science', 'Commerce', 'Arts'
    target_exams = db.Column(db.JSON)  # ['JEE', 'NEET', 'CUET', etc.]
    class_grade = db.Column(db.String(20))  # '9', '10', '11', '12', '1st_year', etc.
    
    # Relationships
    test_results = db.relationship('TestResult', backref='user', lazy=True)
    assessments = db.relationship('Assessment', backref='user', lazy=True)
    holistic_profile = db.relationship('HolisticProfile', backref='user', uselist=False)
    feedback = db.relationship('CareerFeedback', backref='user', lazy=True)
    roadmaps = db.relationship('Roadmap', backref='user', lazy=True)
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Check if password matches"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'academic_stage': self.academic_stage,
            'current_stream': self.current_stream,
            'target_exams': self.target_exams or [],
            'class_grade': self.class_grade,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class TestResult(db.Model):
    __tablename__ = 'test_results'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    personality_type = db.Column(db.String(50))
    scores = db.Column(db.JSON)  # Store RIASEC scores
    recommendations = db.Column(db.JSON)  # Store course recommendations
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'personality_type': self.personality_type,
            'scores': self.scores,
            'recommendations': self.recommendations,
            'created_at': self.created_at.isoformat()
        }


class Assessment(db.Model):
    """Multi-dimensional assessment results"""
    __tablename__ = 'assessments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    assessment_type = db.Column(db.String(50), nullable=False)  # 'riasec', 'aptitude', 'personality', 'values', 'risk'
    scores = db.Column(db.JSON, nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'assessment_type': self.assessment_type,
            'scores': self.scores,
            'completed_at': self.completed_at.isoformat()
        }


class HolisticProfile(db.Model):
    """User's holistic career profile"""
    __tablename__ = 'holistic_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    profile_data = db.Column(db.JSON, nullable=False)
    clarity_score = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'profile_data': self.profile_data,
            'clarity_score': self.clarity_score,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class CareerFeedback(db.Model):
    """User feedback on career recommendations"""
    __tablename__ = 'career_feedback'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    result_id = db.Column(db.Integer, db.ForeignKey('test_results.id'))
    career_name = db.Column(db.String(200), nullable=False)
    helpful = db.Column(db.Boolean)
    rating = db.Column(db.Integer)  # 1-5
    feedback_text = db.Column(db.Text)
    intent_to_pursue = db.Column(db.Boolean)
    doubts = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'result_id': self.result_id,
            'career_name': self.career_name,
            'helpful': self.helpful,
            'rating': self.rating,
            'feedback_text': self.feedback_text,
            'intent_to_pursue': self.intent_to_pursue,
            'doubts': self.doubts,
            'created_at': self.created_at.isoformat()
        }


# Import extended models
from app.models_extended import CareerPath, ExamPreparation, Job, Roadmap
