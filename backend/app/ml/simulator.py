"""What-if career simulator"""
from app.ml.profile_analyzer import CareerAnalyzer

career_analyzer = CareerAnalyzer()


class CareerSimulator:
    """Simulate career recommendations with adjusted parameters"""
    
    def simulate_changes(self, base_profile, adjustments):
        """
        Simulate how recommendations change with adjustments
        
        Args:
            base_profile: Original holistic profile
            adjustments: Dict of changes to apply
        
        Returns:
            Comparison of original vs simulated recommendations
        """
        # Create simulated profile
        simulated_profile = self._apply_adjustments(base_profile.copy(), adjustments)
        
        # Get original recommendations
        original_careers = self._get_top_careers(base_profile)
        
        # Get simulated recommendations
        simulated_careers = self._get_top_careers(simulated_profile)
        
        # Compare
        changes = self._analyze_changes(original_careers, simulated_careers)
        
        # Generate insights
        insights = self._generate_insights(adjustments, changes)
        
        return {
            'original_profile': base_profile,
            'simulated_profile': simulated_profile,
            'original_recommendations': original_careers,
            'simulated_recommendations': simulated_careers,
            'changes': changes,
            'insights': insights
        }
    
    def _apply_adjustments(self, profile, adjustments):
        """Apply user adjustments to profile"""
        simulated = profile.copy()
        
        # Adjust interests (RIASEC)
        if 'interests' in adjustments:
            for code, change in adjustments['interests'].items():
                if 'riasec' in simulated:
                    current = simulated['riasec'].get(code, 0)
                    simulated['riasec'][code] = max(0, min(12, current + change))
        
        # Adjust skills
        if 'skills' in adjustments:
            if 'aptitude' not in simulated:
                simulated['aptitude'] = {}
            for skill, change in adjustments['skills'].items():
                current = simulated['aptitude'].get(skill, 50)
                simulated['aptitude'][skill] = max(0, min(100, current + change))
        
        # Adjust preferences
        if 'preferences' in adjustments:
            simulated['preferences'] = adjustments['preferences']
        
        return simulated
    
    def _get_top_careers(self, profile):
        """Get top career recommendations with confidence scores"""
        # Simplified - get top careers based on RIASEC
        careers = []
        
        if 'riasec' in profile:
            dominant = max(profile['riasec'], key=profile['riasec'].get)
            
            # Map RIASEC to careers (simplified)
            career_map = {
                'R': ['Mechanical Engineer', 'Electrician', 'Carpenter'],
                'I': ['Data Scientist', 'Research Scientist', 'Software Engineer'],
                'A': ['UX Designer', 'Graphic Designer', 'Artist'],
                'S': ['Teacher', 'Counselor', 'Social Worker'],
                'E': ['Product Manager', 'Sales Manager', 'Entrepreneur'],
                'C': ['Accountant', 'Data Analyst', 'Administrator']
            }
            
            career_list = career_map.get(dominant, ['Software Engineer'])
            
            for career in career_list[:5]:
                confidence = career_analyzer.calculate_career_confidence(profile, career)
                careers.append({
                    'career': career,
                    'confidence': confidence['score']
                })
        
        return sorted(careers, key=lambda x: x['confidence'], reverse=True)
    
    def _analyze_changes(self, original, simulated):
        """Analyze what changed between original and simulated"""
        original_careers = {c['career'] for c in original}
        simulated_careers = {c['career'] for c in simulated}
        
        new_careers = simulated_careers - original_careers
        dropped_careers = original_careers - simulated_careers
        
        # Confidence changes for common careers
        confidence_changes = {}
        for orig in original:
            for sim in simulated:
                if orig['career'] == sim['career']:
                    confidence_changes[orig['career']] = {
                        'from': orig['confidence'],
                        'to': sim['confidence'],
                        'change': sim['confidence'] - orig['confidence']
                    }
        
        return {
            'new_careers': list(new_careers),
            'dropped_careers': list(dropped_careers),
            'confidence_changes': confidence_changes
        }
    
    def _generate_insights(self, adjustments, changes):
        """Generate human-readable insights"""
        insights = []
        
        # Interest adjustments
        if 'interests' in adjustments:
            for code, change in adjustments['interests'].items():
                if change > 0:
                    insights.append(f"Increasing {code} interest boosted related career matches")
                elif change < 0:
                    insights.append(f"Decreasing {code} interest reduced related career fits")
        
        # Skill adjustments
        if 'skills' in adjustments:
            for skill, change in adjustments['skills'].items():
                if change > 0:
                    insights.append(f"Improving {skill} skills increased tech career confidence")
        
        # Preference adjustments
        if 'preferences' in adjustments:
            prefs = adjustments['preferences']
            if prefs.get('salary_priority') == 'high':
                insights.append("High salary priority shifted recommendations toward finance/tech")
            if prefs.get('location') == 'abroad':
                insights.append("International preference highlighted globally-relevant careers")
        
        # Changes insights
        if changes['new_careers']:
            insights.append(f"New career options emerged: {', '.join(changes['new_careers'][:2])}")
        
        return insights
