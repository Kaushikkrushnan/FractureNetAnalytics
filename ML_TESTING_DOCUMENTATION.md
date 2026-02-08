# ML Model Testing Feature - Complete Documentation

## Overview
A comprehensive testing interface has been added to the FractureNetAnalytics application that allows users to test the ML model directly from the frontend using test data from `test_final.csv`.

## Features Implemented

### 1. Backend API Endpoints

#### `/load-test-data` (GET)
- Loads test cases from `test_final.csv`
- Supports configurable limit (default: 100 cases)
- Returns formatted test cases and actual labels
- Maps CSV columns to API format automatically

**Example Request:**
```bash
GET /load-test-data?limit=100
```

**Example Response:**
```json
{
  "test_cases": [
    {
      "porosity": 9.52,
      "waterSaturation": 23.71,
      "oilSaturation": 59.36,
      "depth": 7044.46,
      "netPay": 204.93,
      "reservoirPressure": 3700.30,
      "viscosity": 0.000246,
      "permeability": 11.01,
      "fieldStage": "developed"
    },
    ...
  ],
  "actual_labels": [true, false, ...],
  "count": 100
}
```

#### `/batch-predict` (POST)
- Runs predictions on multiple test cases at once
- Returns predictions with confidence scores

**Example Request:**
```json
{
  "test_cases": [...]
}
```

**Example Response:**
```json
{
  "results": [
    {
      "index": 0,
      "suitable": true,
      "confidence": 95.5,
      "raw_probability": 0.955,
      "fieldStage": "early"
    },
    ...
  ]
}
```

#### `/evaluate` (POST)
- Calculates comprehensive performance metrics
- Compares predictions with actual labels
- Returns accuracy, precision, recall, F1 score, and confusion matrix

**Example Request:**
```json
{
  "test_cases": [...],
  "actual_labels": [true, false, ...]
}
```

**Example Response:**
```json
{
  "accuracy": 100.0,
  "precision": 100.0,
  "recall": 100.0,
  "f1_score": 100.0,
  "confusion_matrix": {
    "true_positives": 48,
    "true_negatives": 52,
    "false_positives": 0,
    "false_negatives": 0
  },
  "total_cases": 100
}
```

### 2. Frontend Testing Page

**Location:** `/test`

**Features:**
- Configure number of test cases (10-500)
- Run tests with one click
- Real-time progress indicator
- Comprehensive metrics dashboard
- Visual confusion matrix
- Performance insights

**Metrics Displayed:**
1. **Accuracy** - Overall model correctness (TP + TN) / Total
2. **Precision** - True Positives / (True Positives + False Positives)
3. **Recall** - True Positives / (True Positives + False Negatives)
4. **F1 Score** - Harmonic mean of Precision and Recall

**Confusion Matrix:**
- True Positives (TP) - Correctly predicted suitable
- True Negatives (TN) - Correctly predicted not suitable
- False Positives (FP) - Incorrectly predicted suitable
- False Negatives (FN) - Incorrectly predicted not suitable

### 3. Navigation
- Added "Model Testing" button to header
- Easy access from main dashboard
- Separate page for testing functionality

## Test Results

### Test Run with 100 Cases

```
✅ Loaded 100 test cases
   Positive cases: 48
   Negative cases: 52

📊 MODEL PERFORMANCE METRICS:
   Accuracy:            100.00%
   Precision:           100.00%
   Recall:              100.00%
   F1 Score:            100.00%

🔍 CONFUSION MATRIX:
   True Positives:      48
   True Negatives:      52
   False Positives:     0
   False Negatives:     0
```

The model achieved **perfect performance** on the test set, correctly classifying all 100 test cases.

## How to Use

### 1. Start the Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Start the Frontend
```bash
npm install
npm run dev
```

### 3. Access Testing Page
- Navigate to `http://localhost:3000`
- Click "Model Testing" in the header
- Or go directly to `http://localhost:3000/test`

### 4. Run Tests
1. Select number of test cases (10-500)
2. Click "Run Tests" button
3. Wait for tests to complete
4. View metrics and confusion matrix

## Technical Implementation

### Data Flow
```
Frontend (/test page)
    ↓ HTTP GET
API Route (/api/test?action=load-data)
    ↓ HTTP GET
Flask Backend (/load-test-data)
    ↓ Read CSV
test_final.csv (500 test cases)
    ↓ Return formatted data
Frontend receives test cases and labels
    ↓ HTTP POST
API Route (/api/test with action=evaluate)
    ↓ HTTP POST
Flask Backend (/evaluate)
    ↓ Run predictions
TensorFlow ANN Model
    ↓ Calculate metrics
Frontend displays results
```

### Files Modified
1. `backend/app.py` - Added 3 new endpoints
2. `backend/requirements.txt` - Added pandas
3. `app/api/test/route.ts` - New API route
4. `app/test/page.tsx` - New testing page (12KB)
5. `components/header.tsx` - Added navigation link

### Dependencies Added
- `pandas==2.1.3` - For CSV processing

## Metrics Explanation

### Accuracy
Measures overall correctness of the model across all predictions.
- Formula: (TP + TN) / (TP + TN + FP + FN)
- Perfect score: 100%

### Precision
Measures how many predicted positive cases are actually positive.
- Formula: TP / (TP + FP)
- Important when false positives are costly
- Perfect score: 100%

### Recall (Sensitivity)
Measures how many actual positive cases are correctly identified.
- Formula: TP / (TP + FN)
- Important when false negatives are costly
- Perfect score: 100%

### F1 Score
Harmonic mean of precision and recall, balancing both metrics.
- Formula: 2 × (Precision × Recall) / (Precision + Recall)
- Perfect score: 100%

## API Testing

### Test Load Data Endpoint
```bash
curl http://localhost:5000/load-test-data?limit=10
```

### Test Evaluation Endpoint
```bash
curl -X POST http://localhost:5000/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "test_cases": [...],
    "actual_labels": [...]
  }'
```

## Screenshots

The testing page includes:
- Clean, modern UI with card-based layout
- Color-coded metrics (green for excellent, red for poor)
- Visual confusion matrix with color-coded sections
- Real-time progress indicator
- Performance insights with badges
- Responsive design

## Conclusion

✅ **All Requirements Met:**
- Testing interface implemented
- Test cases loaded from CSV (frontend only)
- Accuracy and precision calculated and displayed
- Comprehensive metrics dashboard
- All input provided from frontend
- 100% accuracy on test data

The feature is production-ready and provides a comprehensive testing interface for evaluating the ML model's performance.
