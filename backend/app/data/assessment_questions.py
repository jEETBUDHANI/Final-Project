"""Assessment questions and data"""

# Aptitude Test Questions
APTITUDE_QUESTIONS = [
    {
        "id": 1,
        "type": "logical",
        "question": "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
        "options": ["True", "False", "Cannot be determined"],
        "correct": 0
    },
    {
        "id": 2,
        "type": "numerical",
        "question": "What is 15% of 80?",
        "options": ["10", "12", "15", "20"],
        "correct": 1
    },
    {
        "id": 3,
        "type": "verbal",
        "question": "Choose the word most similar to 'Eloquent':",
        "options": ["Articulate", "Quiet", "Boring", "Confused"],
        "correct": 0
    },
    {
        "id": 4,
        "type": "spatial",
        "question": "How many cubes are in a 3x3x3 cube?",
        "options": ["9", "18", "27", "36"],
        "correct": 2
    },
    # Add more questions...
]

# Personality Test (Big 5)
PERSONALITY_QUESTIONS = [
    {"id": 1, "trait": "openness", "question": "I enjoy trying new things", "reverse": False},
    {"id": 2, "trait": "conscientiousness", "question": "I am always prepared", "reverse": False},
    {"id": 3, "trait": "extraversion", "question": "I feel comfortable around people", "reverse": False},
    {"id": 4, "trait": "agreeableness", "question": "I sympathize with others' feelings", "reverse": False},
    {"id": 5, "trait": "neuroticism", "question": "I get stressed out easily", "reverse": False},
    # Add more questions...
]

# Work Values Assessment
VALUES_QUESTIONS = [
    {"id": 1, "value": "autonomy", "question": "I prefer working independently"},
    {"id": 2, "value": "security", "question": "Job stability is very important to me"},
    {"id": 3, "value": "creativity", "question": "I enjoy creative problem-solving"},
    {"id": 4, "value": "helping", "question": "I want to help others through my work"},
    {"id": 5, "value": "achievement", "question": "Recognition for my work matters to me"},
    # Add more questions...
]

# Risk Tolerance Assessment
RISK_QUESTIONS = [
    {"id": 1, "question": "I would start my own business even if it means financial uncertainty"},
    {"id": 2, "question": "I prefer stable career paths over high-risk high-reward options"},
    {"id": 3, "question": "I'm comfortable with career changes and transitions"},
    # Add more questions...
]
