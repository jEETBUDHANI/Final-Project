# Career Recommendation System - Quick Start

## Backend Setup (5 minutes)

```bash
# 1. Go to backend folder
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run server
python main.py
```

Backend runs on: **http://localhost:5000**

---

## Frontend Setup (5 minutes)

```bash
# 1. Go to frontend folder
cd frontend

# 2. Install dependencies
npm install axios framer-motion lucide-react

# 3. Run development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## Test the API

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","full_name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## Project Status

✅ **Complete (80%)**
- Backend API with ML
- Authentication system
- Database models
- Next.js setup

🚧 **To Complete**
- Frontend UI components
- Connect frontend to backend
- Add animations

---

## Need Help?

Check `HOW_TO_RUN.md` for detailed instructions!
