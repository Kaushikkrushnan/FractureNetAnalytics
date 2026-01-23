# Test Cases for Fracture-Flooding Suitability Prediction

This document provides comprehensive test cases for validating the ANN model integration. Use these test cases to verify both positive (suitable) and negative (not suitable) predictions.

## Understanding the Model

The ANN model predicts whether a reservoir is suitable for fracture-flooding treatment based on:
- **Porosity**: Percentage of pore space in the reservoir rock
- **Water Saturation**: Percentage of pore space filled with water
- **Oil Saturation**: Percentage of pore space filled with oil
- **Depth**: Depth of the reservoir in feet
- **Net Pay**: Thickness of productive reservoir layer in feet
- **Reservoir Pressure**: Pressure in pounds per square inch (psi)
- **Viscosity**: Oil viscosity in centipoise (cp)
- **Permeability**: Rock permeability in millidarcies (mD)
- **Field Stage**: Development stage (early-stage field, appraisal stage, or developed field)

## Positive Test Cases (Expected Result: TRUE - Suitable for Fracture-Flooding)

### Test Case 1: Optimal Reservoir - High Quality
**Description**: Ideal conditions with high porosity, low water saturation, and excellent permeability

**Input Parameters**:
```json
{
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
```

**Expected Result**: ✅ TRUE (Suitable)
**Confidence**: High (>80%)
**Reasoning**:
- Very high porosity (22.5%) - excellent storage capacity
- Low water saturation (28%) - high oil content
- Excellent permeability (125 mD) - very good flow characteristics
- Good net pay (85 ft) - substantial productive zone
- Early stage field - optimal timing for treatment

---

### Test Case 2: Good Reservoir - Early Stage
**Description**: Good quality reservoir with favorable characteristics

**Input Parameters**:
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

**Expected Result**: ✅ TRUE (Suitable)
**Confidence**: Medium-High (70-85%)
**Reasoning**:
- High porosity (18%) - good storage
- Low water saturation (35%) - favorable oil content
- Good permeability (45 mD) - adequate flow
- Adequate net pay (55 ft) - good productive thickness
- Early stage field - good timing

---

### Test Case 3: Appraisal Stage - Moderate Quality
**Description**: Moderate quality reservoir in appraisal stage

**Input Parameters**:
```json
{
  "porosity": 16.5,
  "waterSaturation": 42.0,
  "oilSaturation": 58.0,
  "depth": 8200,
  "netPay": 48,
  "reservoirPressure": 3500,
  "viscosity": 1.8,
  "permeability": 28,
  "fieldStage": "appraisal"
}
```

**Expected Result**: ✅ TRUE (Suitable) or Borderline
**Confidence**: Medium (60-75%)
**Reasoning**:
- Moderate porosity (16.5%) - adequate storage
- Moderate water saturation (42%) - acceptable
- Moderate permeability (28 mD) - acceptable flow
- Good net pay (48 ft) - adequate thickness

---

## Negative Test Cases (Expected Result: FALSE - Not Suitable for Fracture-Flooding)

### Test Case 4: Poor Reservoir - Low Permeability
**Description**: Poor quality reservoir with multiple limiting factors

**Input Parameters**:
```json
{
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
```

**Expected Result**: ❌ FALSE (Not Suitable)
**Confidence**: High (>80%)
**Reasoning**:
- Very low porosity (8.5%) - poor storage capacity
- High water saturation (68%) - low oil content
- Very low permeability (2.5 mD) - poor flow characteristics
- Low net pay (15 ft) - limited productive zone
- Developed field stage - may have production history

---

### Test Case 5: Marginal Reservoir - High Water Saturation
**Description**: Moderate porosity but very high water content makes it unsuitable

**Input Parameters**:
```json
{
  "porosity": 12.0,
  "waterSaturation": 75.0,
  "oilSaturation": 25.0,
  "depth": 8000,
  "netPay": 22,
  "reservoirPressure": 3500,
  "viscosity": 2.8,
  "permeability": 8.0,
  "fieldStage": "appraisal"
}
```

**Expected Result**: ❌ FALSE (Not Suitable)
**Confidence**: Medium-High (70-85%)
**Reasoning**:
- Moderate porosity (12%) - marginal storage
- Very high water saturation (75%) - very low oil content
- Low permeability (8 mD) - restricted flow
- Marginal net pay (22 ft) - limited thickness

---

### Test Case 6: Developed Field - Depleted Reservoir
**Description**: Previously developed field with poor characteristics

**Input Parameters**:
```json
{
  "porosity": 10.5,
  "waterSaturation": 82.0,
  "oilSaturation": 18.0,
  "depth": 9500,
  "netPay": 18,
  "reservoirPressure": 4500,
  "viscosity": 4.2,
  "permeability": 4.5,
  "fieldStage": "developed"
}
```

**Expected Result**: ❌ FALSE (Not Suitable)
**Confidence**: Very High (>85%)
**Reasoning**:
- Low porosity (10.5%) - poor storage
- Very high water saturation (82%) - minimal oil content
- Very low permeability (4.5 mD) - very restricted flow
- Low net pay (18 ft) - limited productive zone
- High viscosity (4.2 cp) - difficult to mobilize
- Developed field - likely depleted

---

## Borderline/Edge Test Cases

### Test Case 7: Borderline Case - Mixed Characteristics
**Description**: Some good and some poor characteristics

**Input Parameters**:
```json
{
  "porosity": 14.0,
  "waterSaturation": 52.0,
  "oilSaturation": 48.0,
  "depth": 8300,
  "netPay": 32,
  "reservoirPressure": 3600,
  "viscosity": 2.5,
  "permeability": 15,
  "fieldStage": "early"
}
```

**Expected Result**: May vary (Model-dependent)
**Confidence**: Lower (50-65%)
**Reasoning**:
- Moderate porosity (14%) - borderline
- Moderate water saturation (52%) - borderline
- Moderate permeability (15 mD) - borderline
- Adequate net pay (32 ft) - acceptable

---

## How to Use These Test Cases

### Via Frontend UI:
1. Navigate to the application in your browser
2. Enter the values from each test case into the input form
3. Click "Predict Suitability"
4. Verify the result matches the expected outcome

### Via API (cURL):
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

### Via Python:
```python
import requests

url = "http://localhost:5000/predict"
test_case = {
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

response = requests.post(url, json=test_case)
print(response.json())
```

### Via Next.js API:
```bash
curl -X POST http://localhost:3000/api/predict \
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

## Expected Response Format

```json
{
  "suitable": true,
  "confidence": 87.5,
  "fieldStage": "early",
  "explanations": [
    {
      "text": "High porosity (22.50%) strongly supports fracture propagation potential",
      "positive": true
    },
    {
      "text": "Low water saturation (28.00%) strongly supports oil displacement efficiency",
      "positive": true
    },
    {
      "text": "Excellent net pay thickness (85.00 ft) significantly improves sweep efficiency",
      "positive": true
    },
    {
      "text": "Excellent permeability (125.00 mD) ensures optimal fluid flow characteristics",
      "positive": true
    }
  ],
  "raw_probability": 0.875
}
```

## Testing Checklist

- [ ] Test Case 1 (Positive - Optimal) returns TRUE
- [ ] Test Case 2 (Positive - Good) returns TRUE
- [ ] Test Case 3 (Positive - Moderate) returns TRUE
- [ ] Test Case 4 (Negative - Poor) returns FALSE
- [ ] Test Case 5 (Negative - High Water) returns FALSE
- [ ] Test Case 6 (Negative - Depleted) returns FALSE
- [ ] Test Case 7 (Borderline) returns result with appropriate confidence
- [ ] All responses include confidence scores
- [ ] All responses include explanations
- [ ] Frontend displays results correctly
- [ ] Error handling works for invalid inputs
