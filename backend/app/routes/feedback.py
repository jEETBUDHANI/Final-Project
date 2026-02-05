"""User feedback routes for continuous learning"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import UserCareerFeedback

feedback_bp = Blueprint('feedback', __name__)


@feedback_bp.route('/career', methods=['POST'])
@jwt_required()
def submit_career_feedback():
    """Submit user feedback on a career recommendation"""
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        # Validate input
        if not data or not data.get('career_id'):
            return jsonify({'error': 'Career ID is required'}), 400
        
        if not data.get('rating') or data['rating'] < 1 or data['rating'] > 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
        # Create feedback entry
        feedback = UserCareerFeedback(
            user_id=user_id,
            career_id=data['career_id'],
            rating=data['rating'],
            satisfied=data.get('satisfied', False),
            comment=data.get('comment', '')
        )
        
        db.session.add(feedback)
        db.session.commit()
        
        return jsonify({
            'message': 'Feedback submitted successfully',
            'feedback_id': feedback.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@feedback_bp.route('/career', methods=['GET'])
@jwt_required()
def get_user_feedback():
    """Get all feedback submitted by the current user"""
    try:
        user_id = int(get_jwt_identity())
        
        feedbacks = UserCareerFeedback.query.filter_by(user_id=user_id).order_by(
            UserCareerFeedback.created_at.desc()
        ).all()
        
        return jsonify({
            'feedbacks': [f.to_dict() for f in feedbacks]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
