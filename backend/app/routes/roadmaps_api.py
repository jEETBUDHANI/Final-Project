"""
Roadmap generation and management API
Personalized academic and career roadmaps for students
"""
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app.models_extended import Roadmap, CareerPath
from app import db
from datetime import datetime

roadmaps_bp = Blueprint('roadmaps', __name__)


def generate_roadmap_content(user, stage):
    """Generate roadmap content based on user's stage and assessments"""
    
    # Get user's completed assessments
    from app.models import Assessment
    assessments = Assessment.query.filter_by(user_id=user.id).all()
    has_assessments = len(assessments) > 0
    
    # Base roadmap structure
    roadmap = {
        'current_year': {'tasks': [], 'milestones': []},
        'next_year': {'tasks': [], 'milestones': []},
        'future': {'goals': [], 'potential_careers': []}
    }
    
    if stage == '9-10':
        roadmap['current_year'] = {
            'title': 'Focus on Foundation',
            'tasks': [
                'Maintain good grades in all subjects',
                'Explore different subjects to find interests',
                'Participate in extracurricular activities',
                'Start thinking about stream preference (Science/Commerce/Arts)'
            ],
            'milestones': [
                'Complete Board Exams with good scores',
                'Identify 2-3 subjects you enjoy most'
            ]
        }
        roadmap['next_year'] = {
            'title': 'Choose Your Stream (Class 11)',
            'tasks': [
                'Select stream based on interests and career goals',
                'Research careers in your chosen stream',
                'Understand exam requirements (JEE/NEET/CA/CLAT)',
                'Join coaching if planning competitive exams'
            ],
            'milestones': [
                'Make informed stream decision',
                'Start preparation for entrance exams'
            ]
        }
        roadmap['future'] = {
            'goals': [
                'Excel in Class 11-12',
                'Clear entrance exams (JEE/NEET/CUET)',
                'Get into top college/university'
            ],
            'potential_careers': [
                'Engineering', 'Medical', 'Commerce', 'Arts', 'Design', 'Law'
            ]
        }
    
    elif stage == '11-12':
        stream = user.current_stream or 'Not specified'
        
        if stream == 'Science':
            roadmap['current_year'] = {
                'title': 'Exam Preparation Phase',
                'tasks': [
                    'Focus on JEE/NEET preparation',
                    'Complete Class 11 & 12 syllabus thoroughly',
                    'Practice previous year papers',
                    'Take mock tests regularly',
                    'Maintain balance between boards and entrance exams'
                ],
                'milestones': [
                    'Complete 50+ mock tests',
                    'Score 90%+ in boards',
                    'Clear JEE/NEET with good rank'
                ]
            }
            roadmap['future']['potential_careers'] = [
                'Engineer', 'Doctor', 'Researcher', 'Data Scientist'
            ]
        
        elif stream == 'Commerce':
            roadmap['current_year'] = {
                'title': 'Commerce Excellence',
                'tasks': [
                    'Master Accounts, Economics, Business Studies',
                    'Consider CA Foundation after 12th',
                    'Explore MBA path (CAT preparation)',
                    'Learn Excel and financial software',
                    'Internships in finance/business'
                ],
                'milestones': [
                    'Score 95%+ in Commerce subjects',
                    'Clear CA Foundation',
                    'Decide: CA vs MBA vs B.Com'
                ]
            }
            roadmap['future']['potential_careers'] = [
                'Chartered Accountant', 'MBA', 'Financial Analyst', 'Entrepreneur'
            ]
        
        elif stream == 'Arts':
            roadmap['current_year'] = {
                'title': 'Arts & Humanities Path',
                'tasks': [
                    'Excel in your chosen subjects',
                    'Prepare for CUET for central universities',
                    'Build portfolio (if design/media)',
                    'Consider additional certifications',
                    'Explore specialized fields'
                ],
                'milestones': [
                    'Score well in boards',
                    'Clear CUET/CLAT/NIFT',
                    'Get into top university'
                ]
            }
            roadmap['future']['potential_careers'] = [
                'Lawyer', 'Designer', 'Journalist', 'Psychologist', 'Civil Servant'
            ]
        
        roadmap['next_year'] = {
            'title': 'College Selection & Preparation',
            'tasks': [
                'Research colleges and universities',
                'Apply to multiple colleges',
                'Prepare for counseling rounds',
                'Understand course curriculum',
                'Plan for skill development'
            ],
            'milestones': [
                'Get admission in top college',
                'Start college with clear goals'
            ]
        }
    
    elif stage == 'college':
        roadmap['current_year'] = {
            'title': 'Skill Development Phase',
            'tasks': [
                'Excel in your degree program',
                'Build practical skills (coding/design/communication)',
                'Do internships (2-3 minimum)',
                'Work on projects/portfolio',
                'Network with professionals',
                'Prepare for placements/higher studies'
            ],
            'milestones': [
                'Maintain 8+ CGPA',
                'Complete 2+ internships',
                'Build strong portfolio'
            ]
        }
        roadmap['next_year'] = {
            'title': 'Career Launch',
            'tasks': [
                'Apply for jobs/higher studies',
                'Prepare for interviews/entrance exams',
                'Build professional network',
                'Update resume and LinkedIn',
                'Consider certifications (AWS/Google/etc.)'
            ],
            'milestones': [
                'Get job offer or admit to postgrad',
                'Start professional career'
            ]
        }
        roadmap['future'] = {
            'goals': [
                'Establish career in chosen field',
                'Continuous skill upgradation',
                'Specialize in niche area'
            ],
            'potential_careers': [
                'Based on your degree and interests'
            ]
        }
    
    # Add personalized recommendations if assessments done
    if has_assessments:
        roadmap['personalized_note'] = 'Based on your assessment results, we recommend focusing on paths that align with your personality and interests.'
    else:
        roadmap['personalized_note'] = 'Complete all 5 assessments to get personalized career recommendations!'
    
    return roadmap


@roadmaps_bp.route('/', methods=['GET'])
@jwt_required()
def get_user_roadmap():
    """Get user's current roadmap"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get latest roadmap
        roadmap = Roadmap.query.filter_by(user_id=user_id).order_by(Roadmap.updated_at.desc()).first()
        
        if roadmap:
            return jsonify({
                'success': True,
                'roadmap': roadmap.to_dict(),
                'user_stage': user.academic_stage,
                'user_stream': user.current_stream
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'No roadmap found. Please generate one.',
                'user_stage': user.academic_stage
            }), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@roadmaps_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_roadmap():
    """Generate personalized roadmap for user"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json() or {}
        stage = data.get('stage') or user.academic_stage
        
        print(f"Debug - Roadmap generation request: user_id={user_id}, data={data}, user.academic_stage={user.academic_stage}, stage={stage}")
        
        if not stage:
            return jsonify({
                'error': 'Academic stage required',
                'message': 'Please provide academic stage: 9-10, 11-12, or college',
                'hint': 'Send {"stage": "9-10"} or update your profile first'
            }), 400
        
        # Update user's academic info if provided
        if 'academic_stage' in data:
            user.academic_stage = data['academic_stage']
        if 'current_stream' in data:
            user.current_stream = data['current_stream']
        if 'class_grade' in data:
            user.class_grade = data['class_grade']
        if 'target_exams' in data:
            user.target_exams = data['target_exams']
        
        # Generate roadmap content
        content = generate_roadmap_content(user, stage)
        
        # Check if roadmap exists, update or create new
        roadmap = Roadmap.query.filter_by(user_id=user_id, stage=stage).first()
        
        if roadmap:
            roadmap.content = content
            roadmap.updated_at = datetime.utcnow()
        else:
            roadmap = Roadmap(
                user_id=user_id,
                stage=stage,
                content=content
            )
            db.session.add(roadmap)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Roadmap generated successfully',
            'roadmap': roadmap.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@roadmaps_bp.route('/update-stage', methods=['PUT'])
@jwt_required()
def update_academic_stage():
    """Update user's academic stage information"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        if 'academic_stage' in data:
            user.academic_stage = data['academic_stage']
        if 'current_stream' in data:
            user.current_stream = data['current_stream']
        if 'class_grade' in data:
            user.class_grade = data['class_grade']
        if 'target_exams' in data:
            user.target_exams = data['target_exams']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Academic stage updated',
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
