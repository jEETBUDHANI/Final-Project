"""Simple working AI chatbot with intelligent responses"""
from datetime import datetime


class AICareerMentor:
    """Intelligent chatbot with context-aware responses"""
    
    def __init__(self):
        self.conversation_history = []
        self.user_context = {}
    
    def chat(self, user_id, message, user_profile=None):
        """Generate intelligent response based on message"""
        
        # Store user context
        if user_profile:
            self.user_context[user_id] = user_profile
        
        message_lower = message.lower()
        
        # Get user's career info
        user_name = user_profile.get('name', 'there') if user_profile else 'there'
        first_name = user_name.split()[0] if user_name != 'there' else 'there'
        personality = user_profile.get('personality_type', '') if user_profile else ''
        careers = user_profile.get('recommended_careers', []) if user_profile else []
        
        # Generate response based on message content
        response_data = self._generate_response(message_lower, first_name, personality, careers)
        
        # Add to history
        self.conversation_history.append({
            'user_id': user_id,
            'message': message,
            'response': response_data,
            'timestamp': datetime.now().isoformat()
        })
        
        return response_data
    
    def _generate_response(self, message, user_name, personality, careers):
        """Generate contextual response"""
        
        # Greetings
        if any(word in message for word in ['hi', 'hello', 'hey', 'hlo', 'hii']):
            return {
                'response': f"Hey {user_name}! 👋 Great to see you! I'm your AI career mentor. I can help with career advice, skill development, or answer any questions you have. What's on your mind?",
                'follow_up_questions': [
                    "What are you working on?",
                    "Need career advice?",
                    "Want to explore career options?"
                ],
                'suggested_actions': [
                    "Ask about your career path",
                    "Get skill recommendations",
                    "Explore career options"
                ]
            }
        
        # React/Frontend skills
        if any(word in message for word in ['react', 'frontend', 'javascript', 'js']):
            return {
                'response': f"Awesome! Being good at React is a valuable skill! 🚀 Here's what you should do next:\n\n**Level Up Your React:**\n• Master React Hooks (useState, useEffect, useContext)\n• Learn state management (Redux, Zustand, or Recoil)\n• Build full-stack apps with Next.js\n• Practice TypeScript with React\n\n**Expand Your Stack:**\n• Backend: Node.js + Express or Python + Flask\n• Databases: MongoDB, PostgreSQL\n• APIs: REST and GraphQL\n• DevOps: Docker, CI/CD basics\n\n**Career Paths:**\n• Frontend Developer (₹6-15 LPA)\n• Full-Stack Developer (₹8-25 LPA)\n• React Native Developer (₹7-18 LPA)\n\nWhat interests you most - going deeper into frontend or becoming full-stack?",
                'follow_up_questions': [
                    "Should I learn Next.js or backend first?",
                    "What's the best way to learn TypeScript?",
                    "How do I build a portfolio?"
                ],
                'suggested_actions': [
                    "Build 3-5 real projects for your portfolio",
                    "Contribute to open-source React projects",
                    "Learn Next.js for full-stack capabilities"
                ]
            }
        
        # Career confusion
        if any(word in message for word in ['confused', 'dont know', 'unsure', 'help', 'stuck']):
            career_text = f" Based on your {personality} personality, careers like {', '.join(careers[:3])} might be great fits!" if careers else ""
            return {
                'response': f"I totally get it - career decisions can be overwhelming! {career_text}\n\nLet's break this down:\n\n**First, ask yourself:**\n• What do you enjoy doing?\n• What are you naturally good at?\n• What kind of work environment do you prefer?\n• What matters more: money, passion, or work-life balance?\n\nTell me more about what's confusing you, and I'll help you figure it out!",
                'follow_up_questions': [
                    "What are your main interests?",
                    "What skills do you enjoy using?",
                    "What's your biggest career concern?"
                ],
                'suggested_actions': [
                    "Complete your career assessments",
                    "Research careers that interest you",
                    "Talk to people in fields you're curious about"
                ]
            }
        
        # Career recommendations
        if any(word in message for word in ['career', 'job', 'recommend', 'best for me', 'should i']):
            if careers:
                career_list = '\n'.join([f"• **{career}**" for career in careers[:5]])
                return {
                    'response': f"Based on your {personality} personality and assessment results, here are your top career matches:\n\n{career_list}\n\nThese align with your strengths and interests. Each has different paths, salaries, and lifestyles. Which one catches your eye?",
                    'follow_up_questions': [
                        f"Tell me more about {careers[0]}",
                        "What skills do I need?",
                        "Which pays the best?"
                    ],
                    'suggested_actions': [
                        "Research each career in detail",
                        "Connect with professionals in these fields",
                        "Explore required education and certifications"
                    ]
                }
            else:
                return {
                    'response': "To give you personalized career recommendations, complete your career assessments! They help me understand your interests, personality, and strengths.\n\nOnce done, I can suggest careers that truly fit YOU - not just generic options.",
                    'follow_up_questions': [
                        "What are you interested in?",
                        "What subjects do you enjoy?",
                        "Do you prefer working with people or data?"
                    ],
                    'suggested_actions': [
                        "Complete the RIASEC assessment",
                        "Take the personality test",
                        "Explore different career categories"
                    ]
                }
        
        # Skills/Learning
        if any(word in message for word in ['skill', 'learn', 'improve', 'study', 'course']):
            return {
                'response': "Great question! The skills you need depend on your career goals. Here's a roadmap:\n\n**High-Demand Tech Skills:**\n• **Programming**: Python, JavaScript, Java\n• **Web Dev**: React, Node.js, Next.js\n• **Data**: SQL, Excel, Power BI\n• **AI/ML**: Python, TensorFlow, Data Science\n\n**Universal Skills:**\n• Communication & Presentation\n• Problem-solving & Critical thinking\n• Project management\n• Leadership & Teamwork\n\nWhat field are you targeting? I can give you a specific learning path!",
                'follow_up_questions': [
                    "What career field interests you?",
                    "Do you prefer technical or creative skills?",
                    "What skills do you already have?"
                ],
                'suggested_actions': [
                    "Take online courses (Coursera, Udemy, freeCodeCamp)",
                    "Build real projects to practice",
                    "Get certifications in your target field"
                ]
            }
        
        # Salary
        if any(word in message for word in ['salary', 'pay', 'money', 'earn', 'income']):
            return {
                'response': "Salary varies by field, experience, location, and company. Here's a realistic breakdown:\n\n**Tech (India):**\n• Software Engineer: ₹6-25 LPA\n• Data Scientist: ₹8-30 LPA\n• Full-Stack Developer: ₹7-20 LPA\n• UI/UX Designer: ₹5-15 LPA\n\n**Other Fields:**\n• Doctors: ₹10-50 LPA\n• MBA Grads: ₹8-25 LPA\n• Digital Marketing: ₹4-12 LPA\n\n**Pro Tip:** Don't choose a career ONLY for money. Balance passion, lifestyle, and growth potential!",
                'follow_up_questions': [
                    "Which career's salary interests you?",
                    "Is salary your top priority?",
                    "What other factors matter to you?"
                ],
                'suggested_actions': [
                    "Research salary ranges for your target careers",
                    "Consider total compensation (benefits, growth)",
                    "Balance money with passion and work-life balance"
                ]
            }
        
        # General/Other
        return {
            'response': f"That's an interesting question, {user_name}! I'm here to help with anything - career advice, skill development, or general guidance.\n\nCould you tell me more about what you're looking for? The more specific you are, the better I can help!",
            'follow_up_questions': [
                "What specifically would you like to know?",
                "Are you exploring career options?",
                "Do you have a particular goal in mind?"
            ],
            'suggested_actions': [
                "Share more details about your situation",
                "Ask specific questions",
                "Explore your career profile"
            ]
        }
