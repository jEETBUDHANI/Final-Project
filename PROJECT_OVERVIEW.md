# CareerPath Pro: Project Overview

This document explains how all components of the CareerPath Pro project are connected, the technologies used, and the role of Machine Learning (ML).

## 🏗️ Architecture Summary

CareerPath Pro follows a modern **Client-Server architecture** with a decoupled Frontend and Backend.

- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons
- **Backend**: Flask (Python) + SQLAlchemy (Database) + Flask-JWT-Extended (Auth)
- **AI/ML**: Google Gemini API + Scikit-learn (ML Models)

---

## 🔗 How Parts are Connected

### 1. Frontend ↔ Backend (API Connection)
The Frontend communicates with the Backend via **RESTful APIs** using the `axios` library. 
- **Base URL**: `http://localhost:5000/api`
- **Flow**: When you click a button (e.g., "Start Test"), the frontend sends a `POST` or `GET` request. The backend processes it, interacts with the database, and returns JSON data.
- **Security**: Most routes require an `Authorization: Bearer <token>` header (JWT), which is stored in `localStorage` after login.

### 2. Files & Their Roles

#### Frontend (`frontend1/src/`)
- `pages/`: Detailed views like `Dashboard.tsx`, `HolisticProfile.tsx`, and `Roadmap.tsx`.
- `components/`: Reusable UI parts like `FloatingChatbot.tsx` (Shiv) and `NavLink.tsx`.
- `App.tsx`: Main routing configuration using `react-router-dom`.

#### Backend (`backend/app/`)
- `__init__.py`: App factory where Flask is initialized, blueprints are registered, and **CORS** is configured.
- `routes/`: API endpoint definitions (e.g., `auth.py`, `services.py`, `chatbot.py`).
- `services/`: Core logic like `ai_mentor.py` (Shiv's brain) and `report_generator.py`.
- `models.py`: Database schema definitions using SQLAlchemy.

---

## 🤖 The Role of Machine Learning (ML)

ML is the "brain" that provides personalized recommendations:

1. **Career Prediction**: 
   - Uses pre-trained Scikit-learn models (found in `backend/ml_models/`).
   - Takes your assessment scores as input and predicts the best career matches.
2. **AI Mentor (Shiv)**:
   - Powered by **Google Gemini API**.
   - It doesn't just match keywords; it understands your context (name, scores, interests) to answer questions like ChatGPT.
3. **Assessment Logic**:
   - RIASEC and Holland Code algorithms are used to map your interests to specific career clusters.

---

## 🚀 Key Workflows

### Holistic Profile to Roadmap
1. After assessments, `HolisticProfile.tsx` displays your scores.
2. Clicking **"Build Your Roadmap"** sends your top career match to the `/api/roadmap` endpoint.
3. The backend fetches the predefined roadmap for that career from `career_roadmaps.py` and saves it to your profile.

### AI Mentor "Shiv"
1. You type a message in `FloatingChatbot.tsx`.
2. Frontend sends it to `/api/services/mentor/chat`.
3. `ai_mentor.py` builds a "Student Persona" from your database records.
4. It sends this context + your question to Gemini.
5. Shiv responds, and the frontend also offers a "Voice" option using the browser's Speech API.

---

*This project is a blend of React efficiency, Flask scalability, and AI intelligence.*
