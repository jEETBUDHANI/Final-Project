"""Career recommendation explainability service"""
import numpy as np
from app.models import Assessment, HolisticProfile
from app import db


class CareerExplainer:
    """Explain why a career was recommended using feature importance"""
    
    def __init__(self):
        # Feature weights for different assessment dimensions
        self.dimension_weights = {
            'riasec': 0.30,
            'aptitude': 0.25,
            'personality': 0.20,
            'values': 0.15,
            'risk': 0.10
        }
        
        # Career-RIASEC mapping (expanded from profile_analyzer.py)
        self.career_riasec_profiles = {
            'Software Engineer': {'I': 0.4, 'R': 0.3, 'C': 0.3},
            'Data Scientist': {'I': 0.5, 'C': 0.3, 'R': 0.2},
            'UX Designer': {'A': 0.5, 'I': 0.3, 'E': 0.2},
            'Teacher': {'S': 0.5, 'A': 0.3, 'I': 0.2},
            'Product Manager': {'E': 0.4, 'I': 0.3, 'S': 0.3},
            'Marketing Manager': {'E': 0.5, 'A': 0.3, 'S': 0.2},
            'Mechanical Engineer': {'R': 0.5, 'I': 0.3, 'C': 0.2},
            'Accountant': {'C': 0.5, 'I': 0.3, 'R': 0.2},
            'Psychologist': {'S': 0.5, 'I': 0.3, 'A': 0.2},
            'Graphic Designer': {'A': 0.6, 'E': 0.2, 'I': 0.2},
            'Civil Engineer': {'R': 0.4, 'I': 0.3, 'C': 0.3},
            'Nurse': {'S': 0.6, 'R': 0.2, 'I': 0.2},
            'Entrepreneur': {'E': 0.6, 'I': 0.2, 'A': 0.2},
            'Research Scientist': {'I': 0.6, 'R': 0.2, 'C': 0.2},
            'Financial Analyst': {'C': 0.4, 'I': 0.4, 'E': 0.2},
        }
    
    def explain_recommendation(self, user_id, career_name):
        """
        Generate explanation for why a career was recommended
        
        Returns:
            dict with career_name, top_features, explanation_text
        """
        # Get user assessments
        assessments = Assessment.query.filter_by(user_id=user_id).all()
        
        if not assessments:
            return {
                'error': 'No assessments found for user',
                'career_name': career_name,
                'top_features': [],
                'explanation_text': 'Complete assessments to see recommendations'
            }
        
        # Organize assessment data
        profile_data = {}
        for assessment in assessments:
            profile_data[assessment.assessment_type] = assessment.scores
        
        # Calculate contribution scores for each dimension
        contributions = self._calculate_contributions(profile_data, career_name)
        
        # Sort by contribution score
        sorted_contributions = sorted(
            contributions.items(), 
            key=lambda x: x[1]['score'], 
            reverse=True
        )
        
        # Get top features
        top_features = [
            {
                'dimension': dim,
                'contribution_percentage': round(data['score'], 2),
                'details': data['details']
            }
            for dim, data in sorted_contributions[:5]
        ]
        
        # Generate human-readable explanation
        explanation_text = self._generate_explanation_text(top_features, career_name)
        
        return {
            'career_name': career_name,
            'top_features': top_features,
            'explanation_text': explanation_text,
            'overall_match_score': round(sum(c[1]['score'] for c in sorted_contributions), 2)
        }
    
    def _calculate_contributions(self, profile_data, career_name):
        """Calculate how much each dimension contributes to the recommendation"""
        contributions = {}
        
        # RIASEC contribution
        if 'riasec' in profile_data:
            riasec_contribution = self._calculate_riasec_contribution(
                profile_data['riasec'], 
                career_name
            )
            contributions['Interest Match (RIASEC)'] = riasec_contribution
        
        # Aptitude contribution
        if 'aptitude' in profile_data:
            aptitude_contribution = self._calculate_aptitude_contribution(
                profile_data['aptitude'], 
                career_name
            )
            contributions['Aptitude Alignment'] = aptitude_contribution
        
        # Personality contribution
        if 'personality' in profile_data:
            personality_contribution = self._calculate_personality_contribution(
                profile_data['personality'], 
                career_name
            )
            contributions['Personality Fit'] = personality_contribution
        
        # Values contribution
        if 'values' in profile_data:
            values_contribution = self._calculate_values_contribution(
                profile_data['values'], 
                career_name
            )
            contributions['Work Values Alignment'] = values_contribution
        
        # Risk tolerance contribution
        if 'risk' in profile_data:
            risk_contribution = self._calculate_risk_contribution(
                profile_data['risk'], 
                career_name
            )
            contributions['Risk Tolerance Match'] = risk_contribution
        
        return contributions
    
    def _calculate_riasec_contribution(self, riasec_scores, career_name):
        """Calculate RIASEC contribution to recommendation"""
        career_profile = self.career_riasec_profiles.get(
            career_name, 
            {'R': 0.17, 'I': 0.17, 'A': 0.17, 'S': 0.17, 'E': 0.16, 'C': 0.16}
        )
        
        # Calculate weighted match
        match_score = 0
        dominant_traits = []
        
        for code, weight in career_profile.items():
            user_score = riasec_scores.get(code, 0)
            normalized_user_score = user_score / 12  # Normalize to 0-1
            match_score += normalized_user_score * weight * 100
            
            if weight >= 0.3:  # Significant trait
                trait_names = {
                    'R': 'Realistic (hands-on)',
                    'I': 'Investigative (analytical)',
                    'A': 'Artistic (creative)',
                    'S': 'Social (people-oriented)',
                    'E': 'Enterprising (leadership)',
                    'C': 'Conventional (organized)'
                }
                dominant_traits.append(trait_names[code])
        
        contribution_score = match_score * self.dimension_weights['riasec']
        
        return {
            'score': contribution_score,
            'details': f"Your interests align with {', '.join(dominant_traits)} traits required for this career"
        }
    
    def _calculate_aptitude_contribution(self, aptitude_scores, career_name):
        """Calculate aptitude contribution"""
        # Average aptitude score
        avg_aptitude = np.mean(list(aptitude_scores.values()))
        
        # Normalize to 0-100
        contribution_score = avg_aptitude * self.dimension_weights['aptitude']
        
        strong_areas = [k for k, v in aptitude_scores.items() if v >= 70]
        
        details = f"Strong aptitude in {', '.join(strong_areas)}" if strong_areas else "Developing aptitude skills"
        
        return {
            'score': contribution_score,
            'details': details
        }
    
    def _calculate_personality_contribution(self, personality_scores, career_name):
        """Calculate personality contribution"""
        # Average personality alignment
        avg_personality = np.mean(list(personality_scores.values()))
        
        contribution_score = avg_personality * self.dimension_weights['personality']
        
        high_traits = [k.capitalize() for k, v in personality_scores.items() if v >= 70]
        
        details = f"High in {', '.join(high_traits)}" if high_traits else "Balanced personality profile"
        
        return {
            'score': contribution_score,
            'details': details
        }
    
    def _calculate_values_contribution(self, values_scores, career_name):
        """Calculate work values contribution"""
        # Get top value
        top_value = max(values_scores, key=values_scores.get)
        top_value_score = values_scores[top_value]
        
        contribution_score = (top_value_score / 5 * 100) * self.dimension_weights['values']
        
        return {
            'score': contribution_score,
            'details': f"You highly value {top_value.replace('_', ' ')}, which aligns with this career"
        }
    
    def _calculate_risk_contribution(self, risk_scores, career_name):
        """Calculate risk tolerance contribution"""
        # Get risk profile
        risk_level = risk_scores.get('risk_level', 'moderate')
        
        # Map risk levels to scores
        risk_score_map = {
            'conservative': 60,
            'moderate': 75,
            'aggressive': 85
        }
        
        base_score = risk_score_map.get(risk_level, 70)
        contribution_score = base_score * self.dimension_weights['risk']
        
        return {
            'score': contribution_score,
            'details': f"Your {risk_level} risk tolerance fits this career path"
        }
    
    def _generate_explanation_text(self, top_features, career_name):
        """Generate human-readable explanation"""
        if not top_features:
            return f"{career_name} was recommended based on your profile."
        
        top_dimension = top_features[0]['dimension']
        top_contribution = top_features[0]['contribution_percentage']
        
        explanation = f"**{career_name}** was recommended primarily because of your strong **{top_dimension}** "
        explanation += f"(contributing {top_contribution:.1f}% to the match). "
        
        if len(top_features) > 1:
            second_dimension = top_features[1]['dimension']
            explanation += f"Additionally, your **{second_dimension}** also aligns well with this career path."
        
        return explanation
