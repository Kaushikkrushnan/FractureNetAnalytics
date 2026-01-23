# FractureNetAnalytics - Model Integration Guide

## Overview

This project integrates an ANN (Artificial Neural Network) model into a Next.js web application to predict the suitability of oil/gas reservoirs for fracture-flooding treatment. The system consists of:

1. **Flask Backend API**: Serves the ANN model for predictions
2. **Next.js Frontend**: Provides a user-friendly interface for inputting reservoir parameters
3. **API Route**: Connects the frontend to the backend

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js       │────▶│  Next.js API     │────▶│   Flask API     │
│   Frontend      │     │  Route           │     │   Backend       │
│   (Port 3000)   │◀────│  /api/predict    │◀────│   (Port 5000)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                                                           ▼
                                                  ┌─────────────────┐
                                                  │  ANN Model      │
                                                  │  ann_model.h5   │
                                                  │  scaler.pkl     │
                                                  └─────────────────┘
```

## Prerequisites

- Node.js 18+ and npm/pnpm
- Python 3.8+
- pip (Python package manager)

## Installation

### 1. Install Frontend Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or using a virtual environment (recommended):

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Start Flask Backend:**
```bash
cd backend
python app.py
```
The Flask API will start on `http://localhost:5000`

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
# or
pnpm dev
```
The Next.js app will start on `http://localhost:3000`

### Option 2: Using Environment Variables

Create a `.env.local` file in the root directory:

```env
FLASK_API_URL=http://localhost:5000
```

Then start both services as described above.

## Testing

### Backend Tests

Run Python unit tests for the Flask API:

```bash
cd backend
pytest test_app.py -v
```

This will test:
- Model loading
- Health check endpoint
- Prediction endpoint with positive cases
- Prediction endpoint with negative cases
- Input validation
- Different field stages

### Frontend Tests

Run JavaScript/TypeScript tests:

```bash
npm test
# or
pnpm test
```

### Manual Testing with Test Cases

See [TEST_CASES.md](TEST_CASES.md) for comprehensive test cases including:
- **Positive Cases**: Should return TRUE (suitable for fracture-flooding)
- **Negative Cases**: Should return FALSE (not suitable for fracture-flooding)
- **Borderline Cases**: Edge cases with mixed characteristics

### API Testing with cURL

**Test Positive Case:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "porosity": 22.5,
    "waterSaturation": 28.0,
    "oilSaturation": 72.0,
    "depth": 8500,
    "netPay": 85,
    "reservoirPressure": 3800,
    "viscosity": 1.2,
    "permeability": 125,
    "fieldStage": "early"
  }'
```

**Test Negative Case:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "porosity": 8.5,
    "waterSaturation": 68.0,
    "oilSaturation": 32.0,
    "depth": 9200,
    "netPay": 15,
    "reservoirPressure": 4200,
    "viscosity": 3.5,
    "permeability": 2.5,
    "fieldStage": "developed"
  }'
```

**Get Test Cases:**
```bash
curl http://localhost:5000/test-cases
```

## API Endpoints

### Flask Backend API

#### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "columns_loaded": true
}
```

#### `POST /predict`
Make a prediction

**Request Body:**
```json
{
  "porosity": 18.0,
  "waterSaturation": 35.0,
  "oilSaturation": 65.0,
  "depth": 7800,
  "netPay": 55,
  "reservoirPressure": 3200,
  "viscosity": 2.1,
  "permeability": 45,
  "fieldStage": "early"
}
```

**Response:**
```json
{
  "suitable": true,
  "confidence": 85.5,
  "fieldStage": "early",
  "explanations": [
    {
      "text": "High porosity (18.00%) strongly supports fracture propagation potential",
      "positive": true
    },
    ...
  ],
  "raw_probability": 0.855
}
```

#### `GET /test-cases`
Get example test cases for positive and negative predictions

### Next.js API Route

#### `POST /api/predict`
Proxy endpoint that forwards requests to Flask backend

Same request/response format as Flask `/predict` endpoint.

## Model Information

The ANN model (`ann_model.h5`) was trained on reservoir data to predict fracture-flooding suitability. It uses:

- **Input Features**: 10 features (8 numerical + 2 one-hot encoded stage features)
- **Output**: Binary classification (suitable/not suitable)
- **Preprocessing**: StandardScaler for feature normalization
- **Architecture**: Multi-layer neural network

### Model Files

- `ann_model.h5`: Trained Keras model
- `scaler.pkl`: StandardScaler for input normalization
- `preprocessed_columns.pkl`: Column names for proper feature alignment

## Project Structure

```
FractureNetAnalytics/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts          # Next.js API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── app.py                    # Flask API server
│   ├── requirements.txt          # Python dependencies
│   └── test_app.py              # Backend tests
├── components/
│   ├── dashboard.tsx            # Main dashboard component
│   ├── input-card.tsx          # Input form component
│   ├── result-card.tsx         # Results display component
│   └── ui/                     # UI components
├── __tests__/
│   └── api.test.ts             # Frontend tests
├── ann_model.h5                # Trained ANN model
├── scaler.pkl                  # Feature scaler
├── preprocessed_columns.pkl    # Column metadata
├── TEST_CASES.md              # Comprehensive test cases
├── INTEGRATION_GUIDE.md       # This file
└── package.json
```

## Troubleshooting

### Issue: "Failed to connect to prediction service"

**Solution**: Ensure the Flask backend is running on port 5000
```bash
cd backend
python app.py
```

### Issue: "Model file not found"

**Solution**: Ensure `ann_model.h5`, `scaler.pkl`, and `preprocessed_columns.pkl` are in the root directory

### Issue: TensorFlow import errors

**Solution**: Install TensorFlow with specific version
```bash
pip install tensorflow==2.15.0
```

### Issue: CORS errors in browser

**Solution**: Flask-CORS should handle this. Verify it's installed:
```bash
pip install flask-cors
```

## Development

### Adding New Features

1. Backend changes: Modify `backend/app.py`
2. Frontend changes: Modify components in `components/`
3. API route changes: Modify `app/api/predict/route.ts`

### Running in Production

For production deployment:

1. **Flask Backend**: Use a production WSGI server like Gunicorn
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
   ```

2. **Next.js Frontend**: Build and start
   ```bash
   npm run build
   npm start
   ```

3. Set environment variables for production URLs

## Performance Considerations

- The model loads once on Flask startup
- Prediction inference is fast (<100ms typically)
- Consider caching for repeated identical requests
- Use proper WSGI server for production (not Flask dev server)

## Security Notes

- Input validation is performed on both frontend and backend
- CORS is configured for development (adjust for production)
- No authentication is implemented (add if needed)
- Sanitize all user inputs

## Support

For issues or questions:
1. Check [TEST_CASES.md](TEST_CASES.md) for testing guidance
2. Review backend logs for Flask errors
3. Check browser console for frontend errors
4. Verify all model files are present and accessible
