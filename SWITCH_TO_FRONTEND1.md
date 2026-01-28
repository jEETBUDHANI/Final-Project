# 🔄 Switching to Frontend1 (Vite + React)

## Current Situation
- **frontend** folder: Next.js (currently running on port 3000)
- **frontend1** folder: Vite + React + Shadcn UI (your custom frontend)

## ✅ Steps to Switch

### Step 1: Stop Current Frontend
In your terminal running `npm run dev` for frontend, press:
```
Ctrl + C
```

### Step 2: Navigate to frontend1
```bash
cd "c:/Users/LENOVO/OneDrive/Desktop/Final Project/frontend1"
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Run Frontend1
```bash
npm run dev
```

The Vite server will start on: **http://localhost:5173** (Vite's default port)

---

## 🎯 What's Already Done in Frontend1

### ✅ API Configuration
- API URL: `http://localhost:5000/api` ✅
- Axios interceptors for auth tokens ✅
- Auto-redirect on 401 errors ✅

### ✅ Pages Created
1. **Landing** - Home page
2. **Login** - User login
3. **Signup** - User registration
4. **Dashboard** - User dashboard
5. **PersonalityTest** - RIASEC test
6. **Results** - Test results display
7. **Profile** - User profile

### ✅ Features
- Authentication context
- Protected routes
- Form validation
- Error handling
- Shadcn UI components
- Tailwind CSS styling

---

## 🚀 Quick Start Commands

```bash
# Stop current frontend (Ctrl+C in the terminal)

# Go to frontend1
cd "c:/Users/LENOVO/OneDrive/Desktop/Final Project/frontend1"

# Install dependencies (first time only)
npm install

# Run development server
npm run dev
```

---

## 🌐 URLs After Switch

- **Backend**: http://localhost:5000 (keep running)
- **Frontend1**: http://localhost:5173 (Vite default)

---

## 📝 Optional: Rename Folders

If you want to make frontend1 the main frontend:

```bash
# In PowerShell (from Final Project directory)

# Rename current frontend to frontend-old
Rename-Item -Path "frontend" -NewName "frontend-old"

# Rename frontend1 to frontend
Rename-Item -Path "frontend1" -NewName "frontend"

# Now run from the new frontend folder
cd frontend
npm run dev
```

---

## ✅ Verification

After starting frontend1, open browser:
- Go to: http://localhost:5173
- You should see your custom landing page
- Backend is still running on port 5000
- Everything should work together!

---

## 🎨 Your Frontend1 Tech Stack

- **Framework**: Vite + React 18
- **UI Library**: Shadcn UI (Radix UI components)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **Icons**: Lucide React

---

**Your frontend1 is ready to use! Just install dependencies and run it!** 🚀
