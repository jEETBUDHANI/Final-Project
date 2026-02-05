from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, UserProgressSnapshot

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        if 'full_name' in data:
            user.full_name = data['full_name']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@user_bp.route('/progress', methods=['GET'])
@jwt_required()
def get_progress():
    """Get user progress snapshots over time"""
    try:
        user_id = int(get_jwt_identity())
        
        snapshots = UserProgressSnapshot.query.filter_by(user_id=user_id).order_by(
            UserProgressSnapshot.timestamp.asc()
        ).all()
        
        return jsonify({
            'progress': [snapshot.to_dict() for snapshot in snapshots],
            'total_snapshots': len(snapshots)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

