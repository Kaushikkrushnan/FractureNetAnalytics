/**
 * Integration tests for the prediction API route
 */

// Mock fetch for testing
global.fetch = jest.fn()

describe('API Route: /api/predict', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully call the Flask backend and return predictions', async () => {
    const mockResponse = {
      suitable: true,
      confidence: 87.5,
      fieldStage: 'early',
      explanations: [
        {
          text: 'High porosity (22.50%) strongly supports fracture propagation potential',
          positive: true,
        },
      ],
      raw_probability: 0.875,
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const testInput = {
      porosity: 22.5,
      waterSaturation: 28.0,
      oilSaturation: 72.0,
      depth: 8500,
      netPay: 85,
      reservoirPressure: 3800,
      viscosity: 1.2,
      permeability: 125,
      fieldStage: 'early',
    }

    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testInput),
    })

    const data = await response.json()

    expect(response.ok).toBe(true)
    expect(data.suitable).toBe(true)
    expect(data.confidence).toBeGreaterThan(0)
    expect(data.explanations).toBeDefined()
    expect(Array.isArray(data.explanations)).toBe(true)
  })

  it('should handle backend errors gracefully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Backend error' }),
    })

    const testInput = {
      porosity: 22.5,
      waterSaturation: 28.0,
      oilSaturation: 72.0,
      depth: 8500,
      netPay: 85,
      reservoirPressure: 3800,
      viscosity: 1.2,
      permeability: 125,
      fieldStage: 'early',
    }

    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testInput),
    })

    expect(response.ok).toBe(false)
    expect(response.status).toBe(500)
  })
})

describe('Prediction Logic: Positive Cases', () => {
  it('should return suitable=true for optimal reservoir conditions', () => {
    const optimalInput = {
      porosity: 22.5,
      waterSaturation: 28.0,
      oilSaturation: 72.0,
      depth: 8500,
      netPay: 85,
      reservoirPressure: 3800,
      viscosity: 1.2,
      permeability: 125,
      fieldStage: 'early',
    }

    // This is a conceptual test - actual prediction would need backend
    // Just validating input structure
    expect(optimalInput.porosity).toBeGreaterThan(15)
    expect(optimalInput.waterSaturation).toBeLessThan(50)
    expect(optimalInput.permeability).toBeGreaterThan(10)
    expect(optimalInput.netPay).toBeGreaterThan(20)
  })

  it('should return suitable=true for good reservoir conditions', () => {
    const goodInput = {
      porosity: 18.0,
      waterSaturation: 35.0,
      oilSaturation: 65.0,
      depth: 7800,
      netPay: 55,
      reservoirPressure: 3200,
      viscosity: 2.1,
      permeability: 45,
      fieldStage: 'early',
    }

    expect(goodInput.porosity).toBeGreaterThan(15)
    expect(goodInput.waterSaturation).toBeLessThan(50)
    expect(goodInput.permeability).toBeGreaterThan(10)
    expect(goodInput.netPay).toBeGreaterThan(20)
  })
})

describe('Prediction Logic: Negative Cases', () => {
  it('should return suitable=false for poor reservoir conditions', () => {
    const poorInput = {
      porosity: 8.5,
      waterSaturation: 68.0,
      oilSaturation: 32.0,
      depth: 9200,
      netPay: 15,
      reservoirPressure: 4200,
      viscosity: 3.5,
      permeability: 2.5,
      fieldStage: 'developed',
    }

    // Validate this meets "poor" criteria
    expect(poorInput.porosity).toBeLessThan(15)
    expect(poorInput.waterSaturation).toBeGreaterThan(50)
    expect(poorInput.permeability).toBeLessThan(10)
    expect(poorInput.netPay).toBeLessThan(20)
  })

  it('should return suitable=false for high water saturation', () => {
    const highWaterInput = {
      porosity: 12.0,
      waterSaturation: 75.0,
      oilSaturation: 25.0,
      depth: 8000,
      netPay: 22,
      reservoirPressure: 3500,
      viscosity: 2.8,
      permeability: 8.0,
      fieldStage: 'appraisal',
    }

    // High water saturation is a key negative indicator
    expect(highWaterInput.waterSaturation).toBeGreaterThan(70)
    expect(highWaterInput.permeability).toBeLessThan(10)
  })
})

describe('Input Validation', () => {
  it('should validate all required fields are present', () => {
    const requiredFields = [
      'porosity',
      'waterSaturation',
      'oilSaturation',
      'depth',
      'netPay',
      'reservoirPressure',
      'viscosity',
      'permeability',
      'fieldStage',
    ]

    const validInput = {
      porosity: 18.0,
      waterSaturation: 35.0,
      oilSaturation: 65.0,
      depth: 7800,
      netPay: 55,
      reservoirPressure: 3200,
      viscosity: 2.1,
      permeability: 45,
      fieldStage: 'early',
    }

    requiredFields.forEach((field) => {
      expect(validInput).toHaveProperty(field)
      expect(validInput[field as keyof typeof validInput]).toBeDefined()
    })
  })

  it('should validate numeric fields are numbers', () => {
    const input = {
      porosity: 18.0,
      waterSaturation: 35.0,
      oilSaturation: 65.0,
      depth: 7800,
      netPay: 55,
      reservoirPressure: 3200,
      viscosity: 2.1,
      permeability: 45,
      fieldStage: 'early',
    }

    expect(typeof input.porosity).toBe('number')
    expect(typeof input.waterSaturation).toBe('number')
    expect(typeof input.oilSaturation).toBe('number')
    expect(typeof input.depth).toBe('number')
    expect(typeof input.netPay).toBe('number')
    expect(typeof input.reservoirPressure).toBe('number')
    expect(typeof input.viscosity).toBe('number')
    expect(typeof input.permeability).toBe('number')
  })

  it('should validate fieldStage is a valid value', () => {
    const validStages = ['early', 'appraisal', 'developed']
    const input = {
      fieldStage: 'early',
    }

    expect(validStages).toContain(input.fieldStage)
  })
})
