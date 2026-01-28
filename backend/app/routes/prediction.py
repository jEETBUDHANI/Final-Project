from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import TestResult
from app.ml.predictor import predictor

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/test', methods=['POST'])
@jwt_required()
def submit_test():
    """Submit personality test and get recommendations"""
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        print(f"DEBUG: User ID: {user_id}")
        print(f"DEBUG: Request data: {data}")
        
        # Validate input
        if not data or not data.get('scores'):
            print("DEBUG: Missing scores in request")
            return jsonify({'error': 'Test scores are required'}), 400
        
        scores = data['scores']  # Expected: {"R": 10, "I": 8, "A": 12, ...}
        print(f"DEBUG: Scores: {scores}")
        
        # Determine dominant personality type
        dominant_type = max(scores, key=scores.get)
        print(f"DEBUG: Dominant type: {dominant_type}")
        
        # Get personality info
        personality_info = predictor.get_personality_info(dominant_type)
        
        # Get course predictions
        course_predictions = predictor.predict_courses(dominant_type)
        
        # Format recommendations
        recommendations = {
            'personality_type': dominant_type,
            'personality_name': personality_info.get('name', ''),
            'description': personality_info.get('description', ''),
            'mcq_careers': personality_info.get('careers', []),
            'ml_courses': [
                {
                    'course': course,
                    'confidence': round(prob * 100, 2)
                }
                for course, prob in course_predictions
            ]
        }
        
        # Save to database
        test_result = TestResult(
            user_id=user_id,
            personality_type=dominant_type,
            scores=scores,
            recommendations=recommendations
        )
        
        db.session.add(test_result)
        db.session.commit()
        
        return jsonify({
            'message': 'Test submitted successfully',
            'result_id': test_result.id,
            'recommendations': recommendations
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@prediction_bp.route('/results', methods=['GET'])
@jwt_required()
def get_results():
    """Get all test results for current user"""
    try:
        user_id = get_jwt_identity()
        
        results = TestResult.query.filter_by(user_id=user_id).order_by(TestResult.created_at.desc()).all()
        
        return jsonify({
            'results': [result.to_dict() for result in results]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@prediction_bp.route('/results/<int:result_id>', methods=['GET'])
@jwt_required()
def get_result(result_id):
    """Get specific test result"""
    try:
        user_id = get_jwt_identity()
        
        result = TestResult.query.filter_by(id=result_id, user_id=user_id).first()
        
        if not result:
            return jsonify({'error': 'Result not found'}), 404
        
        return jsonify({
            'result': result.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
