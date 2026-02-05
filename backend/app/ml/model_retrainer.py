"""Model retraining service for continuous learning"""
import os
import pickle
import numpy as np
import pandas as pd
from datetime import datetime
from app.models import UserCareerFeedback, Assessment
from app import db
import threading


class ModelRetrainer:
    """Retrain ML model based on user feedback"""
    
    def __init__(self):
        self.model_path = 'rf_model.pkl'
        self.original_data_path = 'stud.csv'
        self.retraining_in_progress = False
    
    def trigger_retraining(self):
        """
        Trigger model retraining in background
        Returns immediately with status
        """
        if self.retraining_in_progress:
            return {
                'status': 'already_running',
                'message': 'Model retraining is already in progress'
            }
        
        # Start retraining in background thread
        thread = threading.Thread(target=self._retrain_model)
        thread.daemon = True
        thread.start()
        
        return {
            'status': 'started',
            'message': 'Model retraining started in background',
            'timestamp': datetime.utcnow().isoformat()
        }
    
    def _retrain_model(self):
        """
        Internal method to retrain the model
        This runs in a background thread
        """
        try:
            self.retraining_in_progress = True
            print("[RETRAINING] Starting model retraining...")
            
            # Step 1: Load original training data
            if not os.path.exists(self.original_data_path):
                print(f"[RETRAINING] Error: Original data file not found at {self.original_data_path}")
                return
            
            original_data = pd.read_csv(self.original_data_path)
            print(f"[RETRAINING] Loaded {len(original_data)} original training samples")
            
            # Step 2: Get feedback data and convert to training signals
            feedback_samples = self._generate_feedback_samples()
            print(f"[RETRAINING] Generated {len(feedback_samples)} feedback-based samples")
            
            if len(feedback_samples) == 0:
                print("[RETRAINING] No feedback data available, skipping retraining")
                return
            
            # Step 3: Merge original data with feedback samples
            feedback_df = pd.DataFrame(feedback_samples)
            combined_data = pd.concat([original_data, feedback_df], ignore_index=True)
            print(f"[RETRAINING] Combined dataset size: {len(combined_data)}")
            
            # Step 4: Retrain the model
            self._train_random_forest(combined_data)
            
            print("[RETRAINING] Model retraining completed successfully!")
            
        except Exception as e:
            print(f"[RETRAINING] Error during retraining: {str(e)}")
        finally:
            self.retraining_in_progress = False
    
    def _generate_feedback_samples(self):
        """
        Convert user feedback into training samples
        
        Feedback → Learning Signal Conversion:
        - Positive feedback (rating >= 4, satisfied=true): Reinforce user's feature vector for that career
        - Negative feedback (rating <= 2, satisfied=false): Create synthetic negative examples
        """
        feedbacks = UserCareerFeedback.query.all()
        samples = []
        
        for feedback in feedbacks:
            # Get user's assessment data
            assessments = Assessment.query.filter_by(user_id=feedback.user_id).all()
            
            if not assessments:
                continue
            
            # Build feature vector from assessments
            feature_vector = self._build_feature_vector(assessments)
            
            if not feature_vector:
                continue
            
            # Positive feedback: Reinforce this pattern
            if feedback.rating >= 4 and feedback.satisfied:
                # Add sample with career as label
                sample = feature_vector.copy()
                sample['Course'] = feedback.career_id
                samples.append(sample)
                
                # Add multiple copies for strong positive feedback (rating 5)
                if feedback.rating == 5:
                    samples.append(sample.copy())
            
            # Negative feedback: This career is NOT a good fit
            elif feedback.rating <= 2 and not feedback.satisfied:
                # We don't add negative examples directly, but we can reduce weight
                # by not reinforcing this pattern
                pass
        
        return samples
    
    def _build_feature_vector(self, assessments):
        """
        Build feature vector from user assessments
        Maps assessment scores to the 59 features in stud.csv
        """
        # This is a simplified mapping - in production, you'd have a more sophisticated mapping
        feature_vector = {}
        
        for assessment in assessments:
            if assessment.assessment_type == 'riasec':
                # Map RIASEC scores to interest-based features
                scores = assessment.scores
                
                # Example mapping (you'd expand this based on your actual features)
                if scores.get('A', 0) > 8:  # Artistic
                    feature_vector['Drawing'] = 1
                    feature_vector['Painting'] = 1
                    feature_vector['Music'] = 1
                
                if scores.get('I', 0) > 8:  # Investigative
                    feature_vector['Coding'] = 1
                    feature_vector['Mathematics'] = 1
                    feature_vector['Science'] = 1
                
                if scores.get('R', 0) > 8:  # Realistic
                    feature_vector['Sports'] = 1
                    feature_vector['Mechanical'] = 1
                
                if scores.get('S', 0) > 8:  # Social
                    feature_vector['Teaching'] = 1
                    feature_vector['Volunteering'] = 1
                
                if scores.get('E', 0) > 8:  # Enterprising
                    feature_vector['Leadership'] = 1
                    feature_vector['Public Speaking'] = 1
                
                if scores.get('C', 0) > 8:  # Conventional
                    feature_vector['Organization'] = 1
                    feature_vector['Data Analysis'] = 1
        
        return feature_vector
    
    def _train_random_forest(self, data):
        """
        Train Random Forest model on combined data
        """
        try:
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.model_selection import train_test_split
            from sklearn.feature_selection import SelectFromModel
            from sklearn.preprocessing import LabelEncoder
            
            # Separate features and target
            X = data.drop('Course', axis=1)
            y = data['Course']
            
            # Encode labels
            label_encoder = LabelEncoder()
            y_encoded = label_encoder.fit_transform(y)
            
            # Train-test split
            X_train, X_test, y_train, y_test = train_test_split(
                X, y_encoded, test_size=0.2, random_state=42
            )
            
            # Train Random Forest
            rf_model = RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                n_jobs=-1
            )
            rf_model.fit(X_train, y_train)
            
            # Feature selection
            selector = SelectFromModel(rf_model, max_features=30, threshold=-np.inf)
            selector.fit(X_train, y_train)
            
            # Save updated model
            with open(self.model_path, 'wb') as f:
                pickle.dump(rf_model, f)
            
            with open('selector.pkl', 'wb') as f:
                pickle.dump(selector, f)
            
            with open('label_encoder.pkl', 'wb') as f:
                pickle.dump(label_encoder, f)
            
            with open('feature_columns.pkl', 'wb') as f:
                pickle.dump(list(X.columns), f)
            
            # Calculate accuracy
            accuracy = rf_model.score(X_test, y_test)
            print(f"[RETRAINING] Model accuracy: {accuracy * 100:.2f}%")
            
        except Exception as e:
            print(f"[RETRAINING] Error training model: {str(e)}")
            raise
