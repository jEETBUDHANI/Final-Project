

# 🎓 Career Recommendation System - Frontend Plan

## Overview
A vibrant, colorful career recommendation dashboard with blue & purple gradients, designed to showcase your ML-powered career guidance system. Fully responsive and connected to your Flask backend at `localhost:5000`.

---

## 🎨 Design Theme
- **Primary Colors**: Blue (#3B82F6) → Purple (#8B5CF6) gradients
- **Style**: Colorful & vibrant with smooth animations
- **Cards**: White cards with subtle shadows on gradient backgrounds
- **Typography**: Bold headings, clean body text

---

## 📄 Pages to Build

### 1. **Landing Page** (`/`)
- Hero section with large background image of students/professionals
- Catchy headline: "Discover Your Perfect Career Path"
- Feature highlights (AI-powered, personalized, accurate)
- Call-to-action buttons → Get Started / Login
- Statistics section (e.g., "3,500+ students guided")

### 2. **Sign Up Page** (`/signup`)
- Clean form: Full Name, Email, Password, Confirm Password
- Blue-purple gradient accent
- Input validation with error messages
- Success → Store JWT token → Redirect to Dashboard

### 3. **Login Page** (`/login`)
- Email & Password form
- "Forgot Password" link (placeholder for now)
- Animated loading state on submit
- Error handling for invalid credentials

### 4. **Dashboard** (`/dashboard`) - Protected Route
**Quick Stats Cards:**
- Total Tests Taken
- Dominant Personality Type badge
- Last Test Date

**Progress Tracker:**
- Timeline showing test history
- Status indicators (completed tests)

**Recent Results Preview:**
- Personality type with icon
- Top 3 career recommendations
- "View Full Results" button

**Quick Action Button:**
- "Take New Test" prominent CTA

### 5. **Personality Test Page** (`/test`) - Protected Route
- 18 questions organized by RIASEC categories
- Progress bar showing completion
- 5-point scale slider/buttons for each question
- Section headers (Realistic, Investigative, Artistic, etc.)
- Final submit → Calculate scores → Send to API

### 6. **Results Page** (`/results/:id`) - Protected Route
**Personality Chart:**
- Radar/hexagon chart showing all 6 RIASEC scores
- Dominant type highlighted with badge

**Career Cards:**
- Beautiful cards for each recommended career
- Career name, brief description
- Visual icons/illustrations per career type

**Course Recommendations:**
- Top 5 courses with confidence percentages
- Progress bars showing ML confidence scores

**Actions:**
- Download/Print results
- Take another test
- Share results

### 7. **Profile Page** (`/profile`) - Protected Route
- Display user info (name, email, join date)
- Edit profile form
- Test history list
- Logout button

---

## 🔐 Authentication System
- JWT token stored in localStorage
- Protected route wrapper component
- Auto-redirect if not logged in
- Token verification on app load

---

## 📱 Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly test questions
- Stacked cards on smaller screens

---

## ✨ Key Features
- Smooth page transitions and animations
- Loading skeletons during data fetch
- Toast notifications for actions
- Error boundaries for graceful failures
- Form validation with helpful messages

---

## 🔗 API Integration
- Axios service layer for all API calls
- Centralized error handling
- Auto-attach JWT to protected requests
- Environment variable for API URL

