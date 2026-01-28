# Career Recommendation System - User Guide

## 📋 Overview
This is a **Career Recommendation System** that combines:
- **Holland Code (RIASEC) Personality Test** - Determines your personality type
- **Machine Learning Model** - Predicts suitable academic courses based on interests

---

## 🚀 How to Run the Project

### **Prerequisites**
Make sure you have Python installed with the following libraries:
```bash
pip install pandas numpy scikit-learn joblib matplotlib tkinter
```

### **Step 1: Train the ML Model (One-time setup)**
Run the ML model training notebook to create the prediction model:

1. Open `ML_model.ipynb` in Jupyter Notebook or JupyterLab
2. Run all cells (Cell → Run All)
3. This will generate the following files:
   - `rf_model.pkl` - Trained Random Forest model
   - `selector.pkl` - Feature selector
   - `label_encoder.pkl` - Course label encoder
   - `feature_columns.pkl` - List of feature names

**Output**: You'll see model accuracy (~99%) and classification report.

---

### **Step 2: Run the Application**
Launch the personality test and career recommendation GUI:

1. Open `Aptitude based personality test and visualization.ipynb`
2. Run all cells
3. A **Tkinter window** will appear with the personality test

---

## 🔄 Application Flow

### **Phase 1: Personality Assessment**
```
Start → Holland Code Test (6 Sections) → Calculate Scores → Determine Dominant Type
```

**The 6 Personality Types (RIASEC):**
1. **R - Realistic**: Practical, hands-on individuals
   - Example careers: Carpenter, Mechanic, Electrician

2. **I - Investigative**: Analytical, problem-solving individuals
   - Example careers: Scientist, Engineer, Researcher

3. **A - Artistic**: Creative, expressive individuals
   - Example careers: Artist, Writer, Designer

4. **S - Social**: Helpful, people-oriented individuals
   - Example careers: Teacher, Counselor, Nurse

5. **E - Enterprising**: Leadership-oriented individuals
   - Example careers: Entrepreneur, Manager, Salesperson

6. **C - Conventional**: Organized, detail-oriented individuals
   - Example careers: Accountant, Analyst, Banker

**For each section:**
- You'll answer 3 questions
- Rate each on a 5-point scale:
  - Strongly Disagree (0)
  - Disagree (1)
  - Neutral (2)
  - Agree (3)
  - Strongly Agree (4)

---

### **Phase 2: Results & Recommendations**
```
Dominant Personality → MCQ Career Suggestions → ML Course Predictions
```

**What you'll see:**
1. **Your Personality Type** - The dominant RIASEC category
2. **MCQ Career Suggestions** - Careers matching your personality
3. **ML Course Recommendations** - Top 5 academic courses with confidence scores

**Example Output:**
```
Personality Type: Investigative
Description: Analytical individuals

MCQ Career Suggestions:
• Scientist
• Engineer
• Researcher

ML Career Recommendations:
• B.Tech.-Computer Science and Engineering (85.23%)
• BCA- Bachelor of Computer Applications (78.45%)
• B.Sc.- Information Technology (72.18%)
• B.Tech.-Electronics and Communication Engineering (68.92%)
• B.Sc. Mathematics (65.37%)
```

---

## 📊 Technical Details

### **Dataset (`stud.csv`)**
- **3,535 student records**
- **59 interest/hobby features** (binary: 0 or 1)
  - Examples: Drawing, Coding, Sports, Music, etc.
- **35 unique courses** as target labels
  - Examples: BBA, B.Tech, MBBS, BCA, etc.

### **ML Model**
- **Algorithm**: Random Forest Classifier
- **Feature Selection**: SelectFromModel (30 most important features)
- **Accuracy**: ~99.15%
- **Training Split**: 80% train, 20% test

### **Prediction Logic**
The app currently generates random student profiles for demonstration. The ML model:
1. Takes the feature vector (30 selected features)
2. Predicts probability distribution across all 35 courses
3. Returns top 5 courses with highest confidence

---

## 📁 Project Structure
```
Final Project/
├── ML_model.ipynb                          # Model training script
├── Aptitude based personality test...ipynb # GUI application
├── stud.csv                                # Training dataset
├── rf_model.pkl                            # Trained model
├── selector.pkl                            # Feature selector
├── label_encoder.pkl                       # Label encoder
├── feature_columns.pkl                     # Feature names
└── aptitude_visualisation.jpeg             # Sample visualization
```

---

## 🎯 Use Cases
1. **Career Counseling** - Help students discover suitable career paths
2. **Educational Planning** - Guide course selection based on interests
3. **Self-Assessment** - Understand personality strengths and preferences

---

## ⚠️ Current Limitations
- The ML prediction uses random inputs rather than mapping actual test responses
- No data persistence (results are not saved)
- Desktop-only (Tkinter GUI)

---

## 🔧 Potential Improvements
1. Map personality test answers directly to ML model features
2. Add data export functionality (PDF/CSV reports)
3. Create a web-based interface (Flask/Django)
4. Implement result history and tracking
5. Add more detailed career information and resources
