"use client"

import { useState } from "react"
import { Header } from "./header"
import { InputCard } from "./input-card"
import { ResultCard } from "./result-card"

export interface PredictionResult {
  suitable: boolean
  confidence: number
  fieldStage: string
  explanations: {
    text: string
    positive: boolean
  }[]
}

export interface FormData {
  porosity: string
  waterSaturation: string
  oilSaturation: string
  depth: string
  netPay: string
  reservoirPressure: string
  viscosity: string
  permeability: string
  fieldStage: string
}

export function Dashboard() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async (formData: FormData) => {
    setIsLoading(true)

    try {
      // Call the Next.js API route which proxies to Flask backend
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          porosity: Number.parseFloat(formData.porosity) || 0,
          waterSaturation: Number.parseFloat(formData.waterSaturation) || 0,
          oilSaturation: Number.parseFloat(formData.oilSaturation) || 0,
          depth: Number.parseFloat(formData.depth) || 0,
          netPay: Number.parseFloat(formData.netPay) || 0,
          reservoirPressure: Number.parseFloat(formData.reservoirPressure) || 0,
          viscosity: Number.parseFloat(formData.viscosity) || 0,
          permeability: Number.parseFloat(formData.permeability) || 0,
          fieldStage: formData.fieldStage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Prediction failed')
      }

      const data = await response.json()
      
      setResult({
        suitable: data.suitable,
        confidence: Math.round(data.confidence),
        fieldStage: data.fieldStage,
        explanations: data.explanations,
      })
    } catch (error) {
      console.error('Prediction error:', error)
      // Show error state - you could add error handling UI here
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to get prediction'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <InputCard onPredict={handlePredict} isLoading={isLoading} />
          <ResultCard result={result} isLoading={isLoading} />
        </div>
      </main>
    </div>
  )
}
