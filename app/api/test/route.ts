import { NextRequest, NextResponse } from 'next/server'

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const limit = searchParams.get('limit') || '100'
    
    if (action === 'load-data') {
      // Load test data from backend
      const response = await fetch(`${FLASK_API_URL}/load-test-data?limit=${limit}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json(
          { error: errorData.error || 'Failed to load test data' },
          { status: response.status }
        )
      }
      
      const data = await response.json()
      return NextResponse.json(data)
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to test service. Please ensure the Flask backend is running.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body
    
    let endpoint = ''
    
    if (action === 'evaluate') {
      endpoint = '/evaluate'
    } else if (action === 'batch-predict') {
      endpoint = '/batch-predict'
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
    
    // Call Flask backend
    const response = await fetch(`${FLASK_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.error || 'Request failed' },
        { status: response.status }
      )
    }
    
    const responseData = await response.json()
    return NextResponse.json(responseData)
    
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to test service. Please ensure the Flask backend is running.' },
      { status: 500 }
    )
  }
}
