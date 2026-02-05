"""Job fit scoring service for recruiters"""
import numpy as np
from app.models import Assessment, Job
from app import db


class JobFitScorer:
    """Calculate candidate-job fit scores for recruiters"""
    
    def calculate_job_fit(self, job_id, candidate_user_ids=None):
        """
        Calculate fit scores for all candidates (or specified candidates) for a job
        
        Returns:
            List of candidates ranked by fit score
        """
        # Get job details
        job = Job.query.get(job_id)
        
        if not job:
            return {'error': 'Job not found'}
        
        # Get all users with assessments (or specified candidates)
        from app.models import User
        
        if candidate_user_ids:
            candidates = User.query.filter(User.id.in_(candidate_user_ids)).all()
        else:
            # Get all users who have completed at least one assessment
            candidates = db.session.query(User).join(Assessment).distinct().all()
        
        # Calculate fit score for each candidate
        ranked_candidates = []
        
        for candidate in candidates:
            fit_result = self._calculate_candidate_fit(candidate.id, job)
            
            if fit_result['fit_score'] is not None:
                ranked_candidates.append({
                    'user_id': candidate.id,
                    'name': candidate.full_name or candidate.email,
                    'email': candidate.email,
                    'fit_score': fit_result['fit_score'],
                    'matching_reasons': fit_result['matching_reasons'],
                    'gaps': fit_result['gaps']
                })
        
        # Sort by fit score (descending)
        ranked_candidates.sort(key=lambda x: x['fit_score'], reverse=True)
        
        return {
            'job_id': job_id,
            'job_title': job.title,
            'total_candidates': len(ranked_candidates),
            'candidates': ranked_candidates
        }
    
    def _calculate_candidate_fit(self, user_id, job):
        """Calculate fit score for a single candidate"""
        # Get candidate assessments
        assessments = Assessment.query.filter_by(user_id=user_id).all()
        
        if not assessments:
            return {
                'fit_score': None,
                'matching_reasons': [],
                'gaps': ['No assessment data available']
            }
        
        # Organize assessment data
        candidate_profile = {}
        for assessment in assessments:
            candidate_profile[assessment.assessment_type] = assessment.scores
        
        # Calculate component scores
        scores = {}
        matching_reasons = []
        gaps = []
        
        # 1. Aptitude Match (30%)
        if job.required_aptitude_level and 'aptitude' in candidate_profile:
            aptitude_score, aptitude_reasons, aptitude_gaps = self._calculate_aptitude_match(
                candidate_profile['aptitude'],
                job.required_aptitude_level
            )
            scores['aptitude'] = aptitude_score * 0.30
            matching_reasons.extend(aptitude_reasons)
            gaps.extend(aptitude_gaps)
        
        # 2. RIASEC Alignment (25%)
        if job.preferred_riasec_traits and 'riasec' in candidate_profile:
            riasec_score, riasec_reasons, riasec_gaps = self._calculate_riasec_match(
                candidate_profile['riasec'],
                job.preferred_riasec_traits
            )
            scores['riasec'] = riasec_score * 0.25
            matching_reasons.extend(riasec_reasons)
            gaps.extend(riasec_gaps)
        
        # 3. Skill Match (25%) - based on required_skills
        if job.required_skills:
            skill_score, skill_reasons, skill_gaps = self._calculate_skill_match(
                candidate_profile,
                job.required_skills
            )
            scores['skills'] = skill_score * 0.25
            matching_reasons.extend(skill_reasons)
            gaps.extend(skill_gaps)
        
        # 4. Risk Tolerance Fit (20%)
        if job.acceptable_risk_tolerance and 'risk' in candidate_profile:
            risk_score, risk_reasons, risk_gaps = self._calculate_risk_match(
                candidate_profile['risk'],
                job.acceptable_risk_tolerance
            )
            scores['risk'] = risk_score * 0.20
            matching_reasons.extend(risk_reasons)
            gaps.extend(risk_gaps)
        
        # Calculate total fit score
        total_fit_score = sum(scores.values())
        
        return {
            'fit_score': round(total_fit_score, 2),
            'matching_reasons': matching_reasons,
            'gaps': gaps if gaps else ['No significant gaps identified']
        }
    
    def _calculate_aptitude_match(self, candidate_aptitude, required_aptitude):
        """Calculate aptitude match score"""
        matching_reasons = []
        gaps = []
        
        total_match = 0
        count = 0
        
        for skill, required_level in required_aptitude.items():
            candidate_level = candidate_aptitude.get(skill, 0)
            
            if candidate_level >= required_level:
                matching_reasons.append(f"Strong {skill} aptitude ({candidate_level}/{required_level})")
                total_match += 100
            elif candidate_level >= required_level * 0.7:
                total_match += 70
            else:
                gaps.append(f"{skill} aptitude below requirement ({candidate_level}/{required_level})")
                total_match += 40
            
            count += 1
        
        score = (total_match / count) if count > 0 else 50
        
        return score, matching_reasons, gaps
    
    def _calculate_riasec_match(self, candidate_riasec, preferred_traits):
        """Calculate RIASEC alignment score"""
        matching_reasons = []
        gaps = []
        
        # Normalize candidate RIASEC scores (0-12 to 0-1)
        normalized_candidate = {k: v / 12 for k, v in candidate_riasec.items()}
        
        # Calculate weighted match
        total_match = 0
        
        for trait, weight in preferred_traits.items():
            candidate_score = normalized_candidate.get(trait, 0)
            
            if candidate_score >= weight * 0.8:
                trait_names = {
                    'R': 'Realistic', 'I': 'Investigative', 'A': 'Artistic',
                    'S': 'Social', 'E': 'Enterprising', 'C': 'Conventional'
                }
                matching_reasons.append(f"{trait_names[trait]} personality trait aligns well")
                total_match += weight * 100
            elif candidate_score >= weight * 0.5:
                total_match += weight * 70
            else:
                total_match += weight * 40
        
        score = min(total_match, 100)
        
        return score, matching_reasons, gaps
    
    def _calculate_skill_match(self, candidate_profile, required_skills):
        """Calculate skill match based on assessments"""
        matching_reasons = []
        gaps = []
        
        # Simplified: Assume moderate skill level if assessments are complete
        completed_assessments = len(candidate_profile)
        
        if completed_assessments >= 3:
            matching_reasons.append(f"Completed {completed_assessments} assessments")
            score = 75
        elif completed_assessments >= 2:
            score = 60
        else:
            gaps.append("Limited assessment data for skill evaluation")
            score = 40
        
        return score, matching_reasons, gaps
    
    def _calculate_risk_match(self, candidate_risk, acceptable_risk):
        """Calculate risk tolerance match"""
        matching_reasons = []
        gaps = []
        
        risk_level = candidate_risk.get('risk_level', 'moderate')
        
        if risk_level == acceptable_risk:
            matching_reasons.append(f"Risk tolerance ({risk_level}) matches job requirement")
            score = 100
        elif (risk_level == 'moderate' or acceptable_risk == 'moderate'):
            score = 75
        else:
            gaps.append(f"Risk tolerance mismatch (candidate: {risk_level}, required: {acceptable_risk})")
            score = 50
        
        return score, matching_reasons, gaps
