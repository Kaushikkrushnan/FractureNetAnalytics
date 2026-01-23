"""
Unit tests for Flask API backend
"""
import sys
import os
import pytest
import json

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app import app, load_model_and_preprocessors


@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config['TESTING'] = True
    
    # Load model and preprocessors before testing
    load_model_and_preprocessors()
    
    with app.test_client() as client:
        yield client


def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'healthy'
    assert data['model_loaded'] is True
    assert data['scaler_loaded'] is True
    assert data['columns_loaded'] is True


def test_predict_positive_case(client):
    """Test prediction with a positive case (should return True)"""
    # High quality reservoir - should be suitable
    input_data = {
        "porosity": 22.5,
        "waterSaturation": 28.0,
        "oilSaturation": 72.0,
        "depth": 8500,
        "netPay": 85,
        "reservoirPressure": 3800,
        "viscosity": 1.2,
        "permeability": 125,
        "fieldStage": "early"
    }
    
    response = client.post('/predict',
                          data=json.dumps(input_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'suitable' in data
    assert 'confidence' in data
    assert 'explanations' in data
    assert isinstance(data['suitable'], bool)
    assert isinstance(data['confidence'], (int, float))
    assert data['confidence'] >= 0 and data['confidence'] <= 100
    assert len(data['explanations']) > 0


def test_predict_negative_case(client):
    """Test prediction with a negative case (should return False)"""
    # Poor quality reservoir - should not be suitable
    input_data = {
        "porosity": 8.5,
        "waterSaturation": 68.0,
        "oilSaturation": 32.0,
        "depth": 9200,
        "netPay": 15,
        "reservoirPressure": 4200,
        "viscosity": 3.5,
        "permeability": 2.5,
        "fieldStage": "developed"
    }
    
    response = client.post('/predict',
                          data=json.dumps(input_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'suitable' in data
    assert 'confidence' in data
    assert 'explanations' in data
    assert isinstance(data['suitable'], bool)
    assert isinstance(data['confidence'], (int, float))
    assert data['confidence'] >= 0 and data['confidence'] <= 100
    assert len(data['explanations']) > 0


def test_predict_missing_fields(client):
    """Test prediction with missing required fields"""
    input_data = {
        "porosity": 15.0,
        "waterSaturation": 40.0
        # Missing other required fields
    }
    
    response = client.post('/predict',
                          data=json.dumps(input_data),
                          content_type='application/json')
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data


def test_predict_no_data(client):
    """Test prediction with no input data"""
    response = client.post('/predict',
                          data=json.dumps({}),
                          content_type='application/json')
    
    assert response.status_code == 400


def test_get_test_cases(client):
    """Test the test cases endpoint"""
    response = client.get('/test-cases')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'positive_cases' in data
    assert 'negative_cases' in data
    assert len(data['positive_cases']) > 0
    assert len(data['negative_cases']) > 0
    
    # Verify structure of test cases
    for case in data['positive_cases']:
        assert 'name' in case
        assert 'description' in case
        assert 'input' in case
        assert 'expected' in case
    
    for case in data['negative_cases']:
        assert 'name' in case
        assert 'description' in case
        assert 'input' in case
        assert 'expected' in case


def test_different_field_stages(client):
    """Test prediction with different field stages"""
    base_input = {
        "porosity": 18.0,
        "waterSaturation": 35.0,
        "oilSaturation": 65.0,
        "depth": 7800,
        "netPay": 55,
        "reservoirPressure": 3200,
        "viscosity": 2.1,
        "permeability": 45
    }
    
    stages = ['early', 'appraisal', 'developed']
    
    for stage in stages:
        input_data = {**base_input, 'fieldStage': stage}
        
        response = client.post('/predict',
                              data=json.dumps(input_data),
                              content_type='application/json')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['fieldStage'] == stage


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
