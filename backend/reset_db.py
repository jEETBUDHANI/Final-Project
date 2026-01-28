"""
Quick database reset script
This will delete the old database and create a fresh one with all the new fields
"""
import os
import sys

# Get the path to the database
db_path = os.path.join(os.path.dirname(__file__), 'career_system.db')

print("\n🔧 Database Reset Script\n")
print("=" * 50)

# Check if database exists
if os.path.exists(db_path):
    print(f"Found existing database: {db_path}")
    print("Deleting old database...")
    os.remove(db_path)
    print("✓ Old database deleted")
else:
    print("No existing database found")

# Create new database
print("\nCreating fresh database with new schema...")

try:
    from app import create_app, db
    
    app = create_app()
    with app.app_context():
        db.create_all()
        print("✓ New database created successfully!")
        print("\nNew tables created:")
        print("  - users (with academic_stage, current_stream, target_exams, class_grade)")
        print("  - career_paths")
        print("  - exam_preparations")
        print("  - jobs")
        print("  - roadmaps")
        print("  - test_results")
        print("  - assessments")
        print("  - holistic_profiles")
        print("  - career_feedback")
    
    print("\n" + "=" * 50)
    print("✅ DATABASE RESET COMPLETE!")
    print("\nNext steps:")
    print("  1. Seed the data: python seed_data.py")
    print("  2. Restart backend if running")
    print("  3. Create a new account at http://localhost:8080/signup")
    print("\n")
    
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
