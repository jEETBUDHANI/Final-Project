"""Skills and skill gap analysis routes"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.ml.skill_gap_analyzer import SkillGapAnalyzer

skills_bp = Blueprint('skills', __name__)
analyzer = SkillGapAnalyzer()


@skills_bp.route('/gap', methods=['GET'])
@jwt_required()
def get_skill_gap():
    """Get skill gap analysis for a user and career"""
    try:
        user_id = int(get_jwt_identity())
        career_name = request.args.get('career')
        
        if not career_name:
            return jsonify({'error': 'Career name is required'}), 400
        
        # Get skill gap analysis
        analysis = analyzer.analyze_gap(user_id, career_name)
        
        if 'error' in analysis:
            return jsonify(analysis), 400
        
        return jsonify(analysis), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
