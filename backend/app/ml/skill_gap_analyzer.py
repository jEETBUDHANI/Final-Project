"""Skill gap analyzer service"""
import numpy as np
from app.models import Assessment, CareerSkill
from app import db


class SkillGapAnalyzer:
    """Analyze skill gaps between user profile and career requirements"""
    
    def __init__(self):
        # Mapping assessment types to skill categories
        self.assessment_skill_mapping = {
            'aptitude': {
                'numerical': ['Mathematics', 'Statistics', 'Data Analysis', 'Financial Analysis'],
                'verbal': ['Communication', 'Writing', 'Presentation', 'Documentation'],
                'logical': ['Problem Solving', 'Critical Thinking', 'Algorithms', 'Logic'],
                'spatial': ['Design', 'Visualization', 'CAD', '3D Modeling'],
                'abstract': ['Pattern Recognition', 'Innovation', 'Creative Thinking']
            },
            'riasec': {
                'R': ['Hands-on Skills', 'Technical Skills', 'Mechanical Skills'],
                'I': ['Research', 'Analysis', 'Scientific Method'],
                'A': ['Creativity', 'Design', 'Artistic Expression'],
                'S': ['Interpersonal Skills', 'Empathy', 'Teaching'],
                'E': ['Leadership', 'Management', 'Negotiation'],
                'C': ['Organization', 'Attention to Detail', 'Data Entry']
            }
        }
    
    def analyze_gap(self, user_id, career_name):
        """
        Analyze skill gap for a user and career
        
        Returns:
            dict with strong_skills, medium_skills, weak_or_missing_skills, learning_priority_order
        """
        # Get required skills for career
        required_skills = CareerSkill.query.filter_by(career_name=career_name).all()
        
        if not required_skills:
            return {
                'error': 'No skill requirements found for this career',
                'career_name': career_name,
                'strong_skills': [],
                'medium_skills': [],
                'weak_or_missing_skills': [],
                'learning_priority_order': []
            }
        
        # Get user assessments
        assessments = Assessment.query.filter_by(user_id=user_id).all()
        
        if not assessments:
            return {
                'error': 'No assessments found for user',
                'career_name': career_name,
                'strong_skills': [],
                'medium_skills': [],
                'weak_or_missing_skills': [],
                'learning_priority_order': []
            }
        
        # Organize assessment data
        user_profile = {}
        for assessment in assessments:
            user_profile[assessment.assessment_type] = assessment.scores
        
        # Analyze each required skill
        skill_analysis = []
        for skill in required_skills:
            user_level = self._estimate_user_skill_level(skill.skill_name, user_profile)
            gap = skill.proficiency_required - user_level
            
            skill_analysis.append({
                'skill_name': skill.skill_name,
                'category': skill.category,
                'required_level': skill.proficiency_required,
                'user_level': user_level,
                'gap': gap,
                'priority': self._calculate_priority(gap, skill.proficiency_required)
            })
        
        # Categorize skills
        strong_skills = [s for s in skill_analysis if s['gap'] <= 0]
        medium_skills = [s for s in skill_analysis if 0 < s['gap'] <= 1]
        weak_or_missing_skills = [s for s in skill_analysis if s['gap'] > 1]
        
        # Sort by priority
        learning_priority_order = sorted(
            weak_or_missing_skills + medium_skills,
            key=lambda x: x['priority'],
            reverse=True
        )
        
        return {
            'career_name': career_name,
            'strong_skills': [self._format_skill(s) for s in strong_skills],
            'medium_skills': [self._format_skill(s) for s in medium_skills],
            'weak_or_missing_skills': [self._format_skill(s) for s in weak_or_missing_skills],
            'learning_priority_order': [self._format_skill(s) for s in learning_priority_order],
            'overall_readiness': self._calculate_overall_readiness(skill_analysis)
        }
    
    def _estimate_user_skill_level(self, skill_name, user_profile):
        """
        Estimate user's skill level (1-5) based on assessment data
        """
        # Check aptitude scores
        if 'aptitude' in user_profile:
            aptitude_scores = user_profile['aptitude']
            
            # Map skill to aptitude category
            for category, skills in self.assessment_skill_mapping['aptitude'].items():
                if skill_name in skills:
                    # Normalize aptitude score (0-100) to 1-5 scale
                    score = aptitude_scores.get(category, 50)
                    return min(5, max(1, int(score / 20) + 1))
        
        # Check RIASEC scores
        if 'riasec' in user_profile:
            riasec_scores = user_profile['riasec']
            
            for code, skills in self.assessment_skill_mapping['riasec'].items():
                if skill_name in skills:
                    # Normalize RIASEC score (0-12) to 1-5 scale
                    score = riasec_scores.get(code, 6)
                    return min(5, max(1, int(score / 2.4) + 1))
        
        # Default: assume moderate skill level
        return 3
    
    def _calculate_priority(self, gap, required_level):
        """
        Calculate learning priority (higher = more urgent)
        Priority considers both gap size and importance (required level)
        """
        if gap <= 0:
            return 0
        
        # Priority = gap * required_level
        # Skills with high requirement and large gap get highest priority
        return gap * required_level
    
    def _format_skill(self, skill_analysis):
        """Format skill analysis for API response"""
        return {
            'skill_name': skill_analysis['skill_name'],
            'category': skill_analysis['category'],
            'required_level': skill_analysis['required_level'],
            'user_level': round(skill_analysis['user_level'], 1),
            'gap': round(skill_analysis['gap'], 1),
            'status': self._get_skill_status(skill_analysis['gap'])
        }
    
    def _get_skill_status(self, gap):
        """Get skill status label"""
        if gap <= 0:
            return 'strong'
        elif gap <= 1:
            return 'medium'
        else:
            return 'weak'
    
    def _calculate_overall_readiness(self, skill_analysis):
        """Calculate overall readiness percentage"""
        if not skill_analysis:
            return 0
        
        total_skills = len(skill_analysis)
        strong_skills = len([s for s in skill_analysis if s['gap'] <= 0])
        medium_skills = len([s for s in skill_analysis if 0 < s['gap'] <= 1])
        
        # Strong skills = 100%, Medium = 60%, Weak = 20%
        readiness = (strong_skills * 100 + medium_skills * 60 + (total_skills - strong_skills - medium_skills) * 20) / total_skills
        
        return round(readiness, 1)
