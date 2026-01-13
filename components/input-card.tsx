"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FlaskConical, Loader2 } from "lucide-react"
import type { FormData } from "./dashboard"

interface InputCardProps {
  onPredict: (data: FormData) => void
  isLoading: boolean
}

const inputFields = [
  { id: "porosity", label: "Porosity", placeholder: "e.g., 18.5", unit: "%" },
  { id: "waterSaturation", label: "Water Saturation", placeholder: "e.g., 35", unit: "%" },
  { id: "oilSaturation", label: "Oil Saturation", placeholder: "e.g., 65", unit: "%" },
  { id: "depth", label: "Depth", placeholder: "e.g., 8500", unit: "ft" },
  { id: "netPay", label: "Net Pay", placeholder: "e.g., 45", unit: "ft" },
  { id: "reservoirPressure", label: "Reservoir Pressure", placeholder: "e.g., 3200", unit: "psi" },
  { id: "viscosity", label: "Viscosity", placeholder: "e.g., 2.5", unit: "cp" },
  { id: "permeability", label: "Permeability (k_md_synth)", placeholder: "e.g., 25", unit: "mD" },
]

export function InputCard({ onPredict, isLoading }: InputCardProps) {
  const [formData, setFormData] = useState<FormData>({
    porosity: "",
    waterSaturation: "",
    oilSaturation: "",
    depth: "",
    netPay: "",
    reservoirPressure: "",
    viscosity: "",
    permeability: "",
    fieldStage: "early",
  })

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FlaskConical className="h-5 w-5 text-primary" />
          Well & Reservoir Parameters
        </CardTitle>
        <CardDescription>Enter the reservoir characteristics for suitability analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {inputFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm text-foreground">
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    id={field.id}
                    type="number"
                    step="any"
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof FormData]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-input border-border pr-12 text-foreground placeholder:text-muted-foreground"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldStage" className="text-sm text-foreground">
              Field Development Stage
            </Label>
            <Select value={formData.fieldStage} onValueChange={(value) => handleInputChange("fieldStage", value)}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="early">Early-Stage Field</SelectItem>
                <SelectItem value="appraisal">Appraisal Stage</SelectItem>
                <SelectItem value="developed">Developed Field</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border">
            Depending on the selected field stage, some parameters may be estimated automatically by the system.
          </p>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Suitability"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
