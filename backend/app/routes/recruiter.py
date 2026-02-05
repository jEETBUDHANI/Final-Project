"""Recruiter routes for job fit scoring"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.ml.job_fit_scorer import JobFitScorer

recruiter_bp = Blueprint('recruiter', __name__)
scorer = JobFitScorer()


@recruiter_bp.route('/job-fit', methods=['GET'])
@jwt_required()
def get_job_fit():
    """Get ranked candidates with fit scores for a job"""
    try:
        job_id = request.args.get('job_id', type=int)
        
        if not job_id:
            return jsonify({'error': 'Job ID is required'}), 400
        
        # Optional: filter by specific candidate IDs
        candidate_ids = request.args.getlist('candidate_ids', type=int)
        
        # Calculate fit scores
        result = scorer.calculate_job_fit(
            job_id, 
            candidate_user_ids=candidate_ids if candidate_ids else None
        )
        
        if 'error' in result:
            return jsonify(result), 404
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
