"""
Database migration script to add new columns to existing users table
Run this if you're getting login errors after adding new fields
"""
from app import create_app, db
from app.models import User

def migrate_database():
    """Add new columns to existing database"""
    app = create_app()
    
    with app.app_context():
        try:
            # Try to add new columns using raw SQL
            with db.engine.connect() as conn:
                # Check if columns exist, if not add them
                try:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN academic_stage VARCHAR(50)"))
                    print("✓ Added academic_stage column")
                except Exception:
                    print("- academic_stage column already exists")
                
                try:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN current_stream VARCHAR(50)"))
                    print("✓ Added current_stream column")
                except Exception:
                    print("- current_stream column already exists")
                
                try:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN target_exams JSON"))
                    print("✓ Added target_exams column")
                except Exception:
                    print("- target_exams column already exists")
                
                try:
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN class_grade VARCHAR(20)"))
                    print("✓ Added class_grade column")
                except Exception:
                    print("- class_grade column already exists")
                
                conn.commit()
            
            print("\n✅ Database migration completed!")
            print("You can now login successfully.\n")
            
        except Exception as e:
            print(f"\n❌ Migration failed: {str(e)}")
            print("\nAlternative: Delete the database file and restart:")
            print("  1. Stop the backend server")
            print("  2. Delete: backend/career_system.db")
            print("  3. Restart backend: python main.py")
            print("  4. Run seed data: python seed_data.py")
            print("  5. Create a new account\n")

if __name__ == '__main__':
    migrate_database()
