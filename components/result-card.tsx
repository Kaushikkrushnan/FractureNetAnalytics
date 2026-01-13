"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Info, TrendingUp, TrendingDown, Activity, Loader2 } from "lucide-react"
import type { PredictionResult } from "./dashboard"

interface ResultCardProps {
  result: PredictionResult | null
  isLoading: boolean
}

const stageLabels: Record<string, string> = {
  early: "Early-Stage Field",
  appraisal: "Appraisal Stage",
  developed: "Developed Field",
}

export function ResultCard({ result, isLoading }: ResultCardProps) {
  if (isLoading) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Analyzing reservoir parameters...</p>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5 text-primary" />
            Prediction Result
          </CardTitle>
          <CardDescription>Results will appear here after analysis</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center border border-border">
            <Activity className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center max-w-xs">
            Enter reservoir parameters and click "Predict Suitability" to get AI-powered analysis
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Activity className="h-5 w-5 text-primary" />
          Prediction Result
        </CardTitle>
        <CardDescription>AI-powered suitability analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prediction Status */}
        <div
          className={`p-4 rounded-lg border ${
            result.suitable ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {result.suitable ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <h3 className={`font-semibold ${result.suitable ? "text-success" : "text-destructive"}`}>
                {result.suitable ? "Suitable for Fracture–Flooding" : "Not Suitable for Fracture–Flooding"}
              </h3>
              <p className="text-sm text-muted-foreground">Based on the provided reservoir parameters</p>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confidence Score</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {result.confidence}%
            </Badge>
          </div>
          <Progress value={result.confidence} className="h-2 bg-secondary" />
        </div>

        {/* Field Stage Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Field Stage:</span>
          <Badge variant="outline" className="border-border text-foreground">
            {stageLabels[result.fieldStage] || result.fieldStage}
          </Badge>
        </div>

        {/* AI Explanation Section */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            AI Explanation
          </h4>
          <ul className="space-y-2">
            {result.explanations.map((explanation, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                {explanation.positive ? (
                  <TrendingUp className="h-4 w-4 mt-0.5 text-success flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                )}
                <span className={explanation.positive ? "text-foreground" : "text-muted-foreground"}>
                  {explanation.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border mt-4">
            <Info className="h-3 w-3 inline-block mr-1" />
            Explanations are generated using explainable AI (SHAP) for transparent decision-making.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
