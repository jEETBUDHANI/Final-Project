"""Admin routes for model management"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.ml.model_retrainer import ModelRetrainer

admin_bp = Blueprint('admin', __name__)
retrainer = ModelRetrainer()


@admin_bp.route('/retrain-model', methods=['POST'])
@jwt_required()
def retrain_model():
    """
    Trigger model retraining based on accumulated user feedback
    Admin-only endpoint (in production, add role-based access control)
    """
    try:
        # In production, verify user has admin role
        # user_id = int(get_jwt_identity())
        # if not is_admin(user_id):
        #     return jsonify({'error': 'Unauthorized'}), 403
        
        result = retrainer.trigger_retraining()
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/retraining-status', methods=['GET'])
@jwt_required()
def get_retraining_status():
    """Get current retraining status"""
    try:
        return jsonify({
            'retraining_in_progress': retrainer.retraining_in_progress
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
