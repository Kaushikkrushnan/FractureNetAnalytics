"""
Flask API backend for ANN model predictions
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pickle
import os

app = Flask(__name__)
CORS(app)

# Global variables for model and preprocessing objects
model = None
scaler = None
preprocessed_columns = None

# Base directory for model files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_model_and_preprocessors():
    """Load the ANN model, scaler, and preprocessed columns"""
    global model, scaler, preprocessed_columns
    
    try:
        # Load the ANN model
        model_path = os.path.join(BASE_DIR, 'ann_model.h5')
        model = tf.keras.models.load_model(model_path)
        print(f"Model loaded successfully from {model_path}")
        
        # Load the scaler
        scaler_path = os.path.join(BASE_DIR, 'scaler.pkl')
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
        print(f"Scaler loaded successfully from {scaler_path}")
        
        # Load preprocessed columns
        columns_path = os.path.join(BASE_DIR, 'preprocessed_columns.pkl')
        with open(columns_path, 'rb') as f:
            preprocessed_columns = pickle.load(f)
        print(f"Preprocessed columns loaded: {preprocessed_columns}")
        
        return True
    except Exception as e:
        print(f"Error loading model or preprocessors: {e}")
        return False


def preprocess_input(input_data):
    """
    Preprocess input data to match the model's expected format
    
    Args:
        input_data: Dictionary containing the input features
        
    Returns:
        numpy array ready for model prediction
    """
    # Get input values and convert percentages to fractions
    porosity = float(input_data.get('porosity', 0)) / 100.0  # Convert from percentage to fraction
    oil_sat = float(input_data.get('oilSaturation', 0)) / 100.0  # Convert from percentage to fraction
    water_sat = float(input_data.get('waterSaturation', 0)) / 100.0  # Convert from percentage to fraction
    depth = float(input_data.get('depth', 0))
    net_pay = float(input_data.get('netPay', 0))
    reservoir_pressure = float(input_data.get('reservoirPressure', 0))
    viscosity = float(input_data.get('viscosity', 0))
    permeability = float(input_data.get('permeability', 0))
    
    # Create feature array
    features = [porosity, oil_sat, water_sat, depth, net_pay, reservoir_pressure, viscosity, permeability]
    
    # Handle stage one-hot encoding
    stage = input_data.get('fieldStage', 'early')
    
    # Map stage values
    stage_mapping = {
        'early': 'early-stage field',
        'appraisal': 'appraisal stage',
        'developed': 'developed field'
    }
    stage_value = stage_mapping.get(stage, 'early-stage field')
    
    # Add one-hot encoded stage features (drop_first=True, so 'appraisal stage' is the reference)
    # Based on preprocessed_columns: ['stage_developed field', 'stage_early-stage field']
    # appraisal stage: both are 0
    # developed field: developed=1, early=0
    # early-stage field: developed=0, early=1
    stage_developed = 1 if stage_value == 'developed field' else 0
    stage_early = 1 if stage_value == 'early-stage field' else 0
    
    features.extend([stage_developed, stage_early])
    
    # Convert to numpy array and reshape
    feature_array = np.array(features).reshape(1, -1)
    
    # Scale the features
    scaled_features = scaler.transform(feature_array)
    
    return scaled_features


def generate_explanations(input_data, prediction_prob):
    """
    Generate explanations based on input features
    
    Args:
        input_data: Dictionary containing the input features
        prediction_prob: Prediction probability from the model
        
    Returns:
        List of explanation dictionaries
    """
    porosity = float(input_data.get('porosity', 0))
    water_sat = float(input_data.get('waterSaturation', 0))
    oil_sat = float(input_data.get('oilSaturation', 0))
    net_pay = float(input_data.get('netPay', 0))
    permeability = float(input_data.get('permeability', 0))
    reservoir_pressure = float(input_data.get('reservoirPressure', 0))
    viscosity = float(input_data.get('viscosity', 0))
    
    explanations = []
    
    # Porosity analysis
    if porosity > 15:
        explanations.append({
            "text": f"High porosity ({porosity:.2f}%) strongly supports fracture propagation potential",
            "positive": True
        })
    elif porosity > 10:
        explanations.append({
            "text": f"Moderate porosity ({porosity:.2f}%) provides adequate fracture network development",
            "positive": True
        })
    else:
        explanations.append({
            "text": f"Low porosity ({porosity:.2f}%) may limit fracture effectiveness and fluid storage capacity",
            "positive": False
        })
    
    # Water saturation analysis
    if water_sat < 40:
        explanations.append({
            "text": f"Low water saturation ({water_sat:.2f}%) strongly supports oil displacement efficiency",
            "positive": True
        })
    elif water_sat < 60:
        explanations.append({
            "text": f"Moderate water saturation ({water_sat:.2f}%) provides acceptable conditions for oil recovery",
            "positive": True
        })
    else:
        explanations.append({
            "text": f"High water saturation ({water_sat:.2f}%) may reduce oil displacement efficiency",
            "positive": False
        })
    
    # Net pay analysis
    if net_pay > 50:
        explanations.append({
            "text": f"Excellent net pay thickness ({net_pay:.2f} ft) significantly improves sweep efficiency",
            "positive": True
        })
    elif net_pay > 20:
        explanations.append({
            "text": f"Adequate net pay thickness ({net_pay:.2f} ft) supports effective treatment coverage",
            "positive": True
        })
    else:
        explanations.append({
            "text": f"Limited net pay ({net_pay:.2f} ft) may reduce treatment effectiveness",
            "positive": False
        })
    
    # Permeability analysis
    if permeability > 50:
        explanations.append({
            "text": f"Excellent permeability ({permeability:.2f} mD) ensures optimal fluid flow characteristics",
            "positive": True
        })
    elif permeability > 10:
        explanations.append({
            "text": f"Good permeability ({permeability:.2f} mD) supports adequate fluid flow",
            "positive": True
        })
    else:
        explanations.append({
            "text": f"Low permeability ({permeability:.2f} mD) may restrict fluid movement and reduce recovery efficiency",
            "positive": False
        })
    
    return explanations


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None,
        'columns_loaded': preprocessed_columns is not None
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Prediction endpoint
    
    Expects JSON with the following fields:
    - porosity: float
    - waterSaturation: float
    - oilSaturation: float
    - depth: float
    - netPay: float
    - reservoirPressure: float
    - viscosity: float
    - permeability: float
    - fieldStage: string ('early', 'appraisal', or 'developed')
    """
    try:
        # Get input data
        input_data = request.get_json()
        
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Validate required fields
        required_fields = ['porosity', 'waterSaturation', 'oilSaturation', 'depth', 
                          'netPay', 'reservoirPressure', 'viscosity', 'permeability', 'fieldStage']
        missing_fields = [field for field in required_fields if field not in input_data]
        
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
        
        # Preprocess input
        preprocessed_input = preprocess_input(input_data)
        
        # Make prediction
        prediction_prob = model.predict(preprocessed_input, verbose=0)[0][0]
        
        # Convert probability to boolean (threshold at 0.5)
        suitable = bool(prediction_prob > 0.5)
        
        # Calculate confidence (convert probability to percentage)
        # If suitable (prob > 0.5), confidence = prob * 100
        # If not suitable (prob < 0.5), confidence = (1 - prob) * 100
        if suitable:
            confidence = float(prediction_prob * 100)
        else:
            confidence = float((1 - prediction_prob) * 100)
        
        # Generate explanations
        explanations = generate_explanations(input_data, prediction_prob)
        
        # Prepare response
        response = {
            'suitable': suitable,
            'confidence': round(confidence, 2),
            'fieldStage': input_data.get('fieldStage'),
            'explanations': explanations,
            'raw_probability': float(prediction_prob)
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': f'Prediction error: {str(e)}'}), 500


@app.route('/test-cases', methods=['GET'])
def get_test_cases():
    """
    Return example test cases for positive and negative predictions
    """
    test_cases = {
        "positive_cases": [
            {
                "name": "Optimal Reservoir - High Quality",
                "description": "High porosity, low water saturation, excellent permeability",
                "input": {
                    "porosity": 22.5,
                    "waterSaturation": 28.0,
                    "oilSaturation": 72.0,
                    "depth": 8500,
                    "netPay": 85,
                    "reservoirPressure": 3800,
                    "viscosity": 1.2,
                    "permeability": 125,
                    "fieldStage": "early"
                },
                "expected": "True - Suitable for fracture-flooding"
            },
            {
                "name": "Good Reservoir - Early Stage",
                "description": "Good porosity and permeability, moderate saturations",
                "input": {
                    "porosity": 18.0,
                    "waterSaturation": 35.0,
                    "oilSaturation": 65.0,
                    "depth": 7800,
                    "netPay": 55,
                    "reservoirPressure": 3200,
                    "viscosity": 2.1,
                    "permeability": 45,
                    "fieldStage": "early"
                },
                "expected": "True - Suitable for fracture-flooding"
            }
        ],
        "negative_cases": [
            {
                "name": "Poor Reservoir - Low Permeability",
                "description": "Low porosity, high water saturation, poor permeability",
                "input": {
                    "porosity": 8.5,
                    "waterSaturation": 68.0,
                    "oilSaturation": 32.0,
                    "depth": 9200,
                    "netPay": 15,
                    "reservoirPressure": 4200,
                    "viscosity": 3.5,
                    "permeability": 2.5,
                    "fieldStage": "developed"
                },
                "expected": "False - Not suitable for fracture-flooding"
            },
            {
                "name": "Marginal Reservoir - High Water Saturation",
                "description": "Moderate porosity but very high water saturation",
                "input": {
                    "porosity": 12.0,
                    "waterSaturation": 75.0,
                    "oilSaturation": 25.0,
                    "depth": 8000,
                    "netPay": 22,
                    "reservoirPressure": 3500,
                    "viscosity": 2.8,
                    "permeability": 8.0,
                    "fieldStage": "appraisal"
                },
                "expected": "False - Not suitable for fracture-flooding"
            }
        ]
    }
    
    return jsonify(test_cases)


if __name__ == '__main__':
    # Load model and preprocessors on startup
    if load_model_and_preprocessors():
        print("Starting Flask server...")
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        print("Failed to load model and preprocessors. Exiting.")
