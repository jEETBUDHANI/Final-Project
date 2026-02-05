"""Seed career skills data"""
import sys
import os

# Add parent directory to path for direct execution
if __name__ == '__main__':
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app import db, create_app
from app.models import CareerSkill


def seed_career_skills():
    """Populate career_skills table with predefined skill mappings"""
    
    skills_data = [
        # Software Engineer
        {'career_name': 'Software Engineer', 'skill_name': 'Programming', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Software Engineer', 'skill_name': 'Data Structures', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Software Engineer', 'skill_name': 'Algorithms', 'proficiency_required': 4, 'category': 'technical'},
        {'career_name': 'Software Engineer', 'skill_name': 'Problem Solving', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Software Engineer', 'skill_name': 'Communication', 'proficiency_required': 3, 'category': 'soft'},
        {'career_name': 'Software Engineer', 'skill_name': 'Critical Thinking', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'Software Engineer', 'skill_name': 'Mathematics', 'proficiency_required': 3, 'category': 'domain'},
        
        # Data Scientist
        {'career_name': 'Data Scientist', 'skill_name': 'Statistics', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Data Scientist', 'skill_name': 'Programming', 'proficiency_required': 4, 'category': 'technical'},
        {'career_name': 'Data Scientist', 'skill_name': 'Data Analysis', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Data Scientist', 'skill_name': 'Mathematics', 'proficiency_required': 5, 'category': 'domain'},
        {'career_name': 'Data Scientist', 'skill_name': 'Problem Solving', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Data Scientist', 'skill_name': 'Communication', 'proficiency_required': 4, 'category': 'soft'},
        
        # UX Designer
        {'career_name': 'UX Designer', 'skill_name': 'Design', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'UX Designer', 'skill_name': 'Creativity', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'UX Designer', 'skill_name': 'Visualization', 'proficiency_required': 4, 'category': 'technical'},
        {'career_name': 'UX Designer', 'skill_name': 'Empathy', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'UX Designer', 'skill_name': 'Communication', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'UX Designer', 'skill_name': 'Problem Solving', 'proficiency_required': 4, 'category': 'soft'},
        
        # Teacher
        {'career_name': 'Teacher', 'skill_name': 'Communication', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Teacher', 'skill_name': 'Teaching', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Teacher', 'skill_name': 'Empathy', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Teacher', 'skill_name': 'Interpersonal Skills', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Teacher', 'skill_name': 'Organization', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'Teacher', 'skill_name': 'Presentation', 'proficiency_required': 5, 'category': 'soft'},
        
        # Product Manager
        {'career_name': 'Product Manager', 'skill_name': 'Leadership', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Product Manager', 'skill_name': 'Communication', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Product Manager', 'skill_name': 'Problem Solving', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Product Manager', 'skill_name': 'Analysis', 'proficiency_required': 4, 'category': 'technical'},
        {'career_name': 'Product Manager', 'skill_name': 'Negotiation', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'Product Manager', 'skill_name': 'Management', 'proficiency_required': 4, 'category': 'soft'},
        
        # Mechanical Engineer
        {'career_name': 'Mechanical Engineer', 'skill_name': 'Technical Skills', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Mechanical Engineer', 'skill_name': 'CAD', 'proficiency_required': 4, 'category': 'technical'},
        {'career_name': 'Mechanical Engineer', 'skill_name': 'Mathematics', 'proficiency_required': 5, 'category': 'domain'},
        {'career_name': 'Mechanical Engineer', 'skill_name': 'Problem Solving', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Mechanical Engineer', 'skill_name': 'Hands-on Skills', 'proficiency_required': 4, 'category': 'technical'},
        
        # Accountant
        {'career_name': 'Accountant', 'skill_name': 'Financial Analysis', 'proficiency_required': 5, 'category': 'technical'},
        {'career_name': 'Accountant', 'skill_name': 'Attention to Detail', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Accountant', 'skill_name': 'Organization', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Accountant', 'skill_name': 'Mathematics', 'proficiency_required': 4, 'category': 'domain'},
        {'career_name': 'Accountant', 'skill_name': 'Data Entry', 'proficiency_required': 4, 'category': 'technical'},
        
        # Marketing Manager
        {'career_name': 'Marketing Manager', 'skill_name': 'Creativity', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Marketing Manager', 'skill_name': 'Communication', 'proficiency_required': 5, 'category': 'soft'},
        {'career_name': 'Marketing Manager', 'skill_name': 'Leadership', 'proficiency_required': 4, 'category': 'soft'},
        {'career_name': 'Marketing Manager', 'skill_name': 'Data Analysis', 'proficiency_required': 3, 'category': 'technical'},
        {'career_name': 'Marketing Manager', 'skill_name': 'Presentation', 'proficiency_required': 5, 'category': 'soft'},
    ]
    
    app = create_app()
    with app.app_context():
        # Clear existing data
        CareerSkill.query.delete()
        
        # Add new skills
        for skill_data in skills_data:
            skill = CareerSkill(**skill_data)
            db.session.add(skill)
        
        db.session.commit()
        print(f"Successfully seeded {len(skills_data)} career skills")


if __name__ == '__main__':
    seed_career_skills()
