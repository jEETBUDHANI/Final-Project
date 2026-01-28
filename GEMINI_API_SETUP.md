# 🤖 How to Get FREE Google Gemini API Key

## Step 1: Go to Google AI Studio
Visit: https://makersuite.google.com/app/apikey

## Step 2: Sign in with Google Account
Use your Gmail account

## Step 3: Click "Get API Key"
- Click "Create API Key"
- Select "Create API key in new project" (or use existing)
- Copy the API key

## Step 4: Add to Your Project

### Option A: Set Environment Variable (Recommended)
```bash
# Windows (PowerShell)
$env:GEMINI_API_KEY="your-api-key-here"

# Windows (CMD)
set GEMINI_API_KEY=your-api-key-here

# Linux/Mac
export GEMINI_API_KEY="your-api-key-here"
```

### Option B: Create .env File
1. Create file: `backend/.env`
2. Add: `GEMINI_API_KEY=your-api-key-here`
3. Install: `pip install python-dotenv`
4. The app will auto-load it

### Option C: Hardcode (Not Recommended)
Edit `backend/app/services/ai_mentor.py` line 15:
```python
api_key = "your-api-key-here"
```

## Step 5: Restart Backend
```bash
cd backend
python main.py
```

## ✅ Test It!
1. Go to http://localhost:5173/mentor
2. Ask: "What career is best for me?"
3. Get intelligent AI response!

## 📊 Free Tier Limits
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ Completely FREE forever!

## 🔒 Security Note
- Never commit API keys to Git
- Add `.env` to `.gitignore`
- Use environment variables in production
