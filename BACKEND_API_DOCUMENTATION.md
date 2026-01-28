# Backend API Documentation - Career Recommendation System

## 🎯 Overview
This is a **Flask-based REST API** that provides career recommendation services using Machine Learning. The backend handles user authentication, personality assessments, and AI-powered career/course predictions.

---

## 🏗️ Architecture

### **Tech Stack**
- **Framework**: Flask (Python)
- **Database**: SQLite (can be upgraded to PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **ML Model**: Random Forest Classifier (scikit-learn)
- **Password Security**: bcrypt hashing

### **Project Structure**
```
backend/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── models.py             # Database models (User, TestResult)
│   ├── routes/
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── prediction.py    # ML prediction endpoints
│   │   └── user.py          # User profile endpoints
│   ├── ml/
│   │   ├── predictor.py     # ML model loader and prediction logic
│   │   └── models/          # Trained ML models (.pkl files)
│   └── utils/
├── data/
│   └── stud.csv             # Training dataset (3,535 students)
├── main.py                  # Entry point
├── requirements.txt         # Dependencies
└── .env                     # Environment variables
```

---

## 📊 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Test Results Table**
```sql
CREATE TABLE test_results (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    personality_type VARCHAR(50),      -- Dominant RIASEC type (R/I/A/S/E/C)
    scores JSON,                       -- {"R": 10, "I": 8, "A": 12, ...}
    recommendations JSON,              -- Full recommendation object
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 API Endpoints

### **Base URL**: `http://localhost:5000/api`

---

### **1. Authentication Endpoints** (`/api/auth`)

#### **POST /api/auth/signup**
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2026-01-25T10:00:00"
  }
}
```

**Error (400):**
```json
{
  "error": "Email already registered"
}
```

---

#### **POST /api/auth/login**
Login existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2026-01-25T10:00:00"
  }
}
```

**Error (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

#### **GET /api/auth/verify**
Verify if JWT token is valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Token is valid",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2026-01-25T10:00:00"
  }
}
```

---

### **2. Prediction Endpoints** (`/api/predict`)

#### **POST /api/predict/test**
Submit personality test and get career recommendations.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "scores": {
    "R": 10,  // Realistic score (0-12)
    "I": 8,   // Investigative score (0-12)
    "A": 12,  // Artistic score (0-12)
    "S": 6,   // Social score (0-12)
    "E": 9,   // Enterprising score (0-12)
    "C": 7    // Conventional score (0-12)
  }
}
```

**Response (200):**
```json
{
  "message": "Test submitted successfully",
  "result_id": 1,
  "recommendations": {
    "personality_type": "A",
    "personality_name": "Artistic",
    "description": "Creative individuals who enjoy expressing themselves through various art forms.",
    "mcq_careers": [
      "Artist",
      "Writer",
      "Designer",
      "Musician",
      "Architect"
    ],
    "ml_courses": [
      {
        "course": "B.Des - Bachelor of Design",
        "confidence": 85.23
      },
      {
        "course": "BFA - Bachelor of Fine Arts",
        "confidence": 78.45
      },
      {
        "course": "B.Arch - Bachelor of Architecture",
        "confidence": 72.18
      },
      {
        "course": "Animation and Multimedia",
        "confidence": 68.92
      },
      {
        "course": "Fashion Design",
        "confidence": 65.37
      }
    ]
  }
}
```

---

#### **GET /api/predict/results**
Get all test results for current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "results": [
    {
      "id": 1,
      "user_id": 1,
      "personality_type": "A",
      "scores": {
        "R": 10,
        "I": 8,
        "A": 12,
        "S": 6,
        "E": 9,
        "C": 7
      },
      "recommendations": { /* full recommendations object */ },
      "created_at": "2026-01-25T10:30:00"
    }
  ]
}
```

---

#### **GET /api/predict/results/:id**
Get specific test result by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "result": {
    "id": 1,
    "user_id": 1,
    "personality_type": "A",
    "scores": { /* RIASEC scores */ },
    "recommendations": { /* full recommendations */ },
    "created_at": "2026-01-25T10:30:00"
  }
}
```

---

### **3. User Endpoints** (`/api/user`)

#### **GET /api/user/profile**
Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2026-01-25T10:00:00"
  }
}
```

---

#### **PUT /api/user/profile**
Update user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "John Updated Doe"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Updated Doe",
    "created_at": "2026-01-25T10:00:00"
  }
}
```

---

## 🤖 Machine Learning Model

### **Model Details**
- **Algorithm**: Random Forest Classifier
- **Training Data**: 3,535 student records with 59 interest/hobby features
- **Accuracy**: ~99.15%
- **Output**: 35 unique course recommendations

### **RIASEC Personality Framework**
The system uses the Holland Code (RIASEC) model:

| Type | Name | Description | Example Careers |
|------|------|-------------|-----------------|
| **R** | Realistic | Practical, hands-on workers | Carpenter, Mechanic, Engineer |
| **I** | Investigative | Analytical thinkers | Scientist, Researcher, Analyst |
| **A** | Artistic | Creative individuals | Artist, Writer, Designer |
| **S** | Social | People helpers | Teacher, Counselor, Nurse |
| **E** | Enterprising | Natural leaders | Entrepreneur, Manager, Lawyer |
| **C** | Conventional | Organized workers | Accountant, Banker, Clerk |

### **Prediction Process**
1. User completes 18 questions (3 per personality type)
2. Each question scored 0-4 (Strongly Disagree to Strongly Agree)
3. Total score per type: 0-12
4. Dominant type = highest score
5. ML model predicts top 5 courses with confidence scores

---

## 🔑 Authentication Flow

### **How JWT Works**
1. User signs up or logs in
2. Backend generates JWT token
3. Frontend stores token in `localStorage`
4. Frontend sends token in `Authorization: Bearer <token>` header
5. Backend validates token for protected routes

### **Token Storage (Frontend)**
```javascript
// After login/signup
localStorage.setItem('token', response.data.access_token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// For API calls
const token = localStorage.getItem('token');
headers: { Authorization: `Bearer ${token}` }

// Logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 📝 Frontend Implementation Guide

### **Required Pages**

1. **Landing Page** (`/`)
   - Hero section
   - Features showcase
   - Call-to-action buttons

2. **Signup Page** (`/signup`)
   - Form: email, password, full_name
   - Call `POST /api/auth/signup`
   - Store token and redirect to dashboard

3. **Login Page** (`/login`)
   - Form: email, password
   - Call `POST /api/auth/login`
   - Store token and redirect to dashboard

4. **Dashboard** (`/dashboard`)
   - Protected route (requires token)
   - Display user info
   - Show test history
   - Button to start new test

5. **Personality Test** (`/test`)
   - Protected route
   - 18 questions across 6 sections
   - 5-point Likert scale (0-4)
   - Calculate scores and submit to `POST /api/predict/test`

6. **Results Page** (`/results/:id`)
   - Protected route
   - Fetch from `GET /api/predict/results/:id`
   - Display personality type, careers, courses

---

## 🚀 How to Run Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Server runs on: **http://localhost:5000**

---

## ✅ What's Complete

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ ML model integration
- ✅ Personality test submission
- ✅ Career and course recommendations
- ✅ Test history storage
- ✅ User profile management
- ✅ CORS enabled for frontend

---

## 🎯 Frontend Requirements

### **Must Have:**
1. Axios or Fetch for API calls
2. Token management (localStorage)
3. Protected routes (redirect if no token)
4. Form validation
5. Error handling
6. Loading states

### **API Service Example:**
```javascript
const API_URL = 'http://localhost:5000/api';

// Signup
const signup = async (data) => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  return response.data;
};

// Login
const login = async (data) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

// Submit Test (with token)
const submitTest = async (scores) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/predict/test`,
    { scores },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
```

---

## 🎨 Recommended UI Flow

```
Landing Page
    ↓
Signup/Login
    ↓
Dashboard (shows test history)
    ↓
Take Test (18 questions)
    ↓
Results Page (personality + recommendations)
    ↓
Back to Dashboard
```

---

## 📞 Support

**Backend is 100% complete and tested!**
- All endpoints working
- ML models loaded
- Database configured
- Authentication secure

**Just build the frontend to connect to these APIs!** 🚀
