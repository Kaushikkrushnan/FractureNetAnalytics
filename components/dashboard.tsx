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

    // Simulate API call to ML backend
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock prediction result based on form data
    const porosity = Number.parseFloat(formData.porosity) || 0
    const waterSat = Number.parseFloat(formData.waterSaturation) || 0
    const netPay = Number.parseFloat(formData.netPay) || 0
    const permeability = Number.parseFloat(formData.permeability) || 0

    const suitable = porosity > 15 && waterSat < 50 && netPay > 20 && permeability > 10
    const confidence = Math.min(95, Math.max(55, 70 + (porosity - 15) * 2 + (50 - waterSat) * 0.5))

    const explanations = [
      {
        text:
          porosity > 15
            ? "High porosity strongly supports fracture propagation potential"
            : "Low porosity may limit fracture effectiveness",
        positive: porosity > 15,
      },
      {
        text:
          netPay > 20
            ? "Adequate net pay thickness improves sweep efficiency"
            : "Limited net pay may reduce treatment effectiveness",
        positive: netPay > 20,
      },
      {
        text:
          waterSat < 50
            ? "Favorable water saturation supports oil displacement"
            : "High water saturation may reduce oil displacement efficiency",
        positive: waterSat < 50,
      },
      {
        text:
          permeability > 10
            ? "Good permeability enhances fluid flow characteristics"
            : "Low permeability may restrict fluid movement",
        positive: permeability > 10,
      },
    ]

    setResult({
      suitable,
      confidence: Math.round(confidence),
      fieldStage: formData.fieldStage,
      explanations,
    })

    setIsLoading(false)
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
