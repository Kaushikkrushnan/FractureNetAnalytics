"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface TestMetrics {
  accuracy: number
  precision: number
  recall: number
  f1_score: number
  confusion_matrix: {
    true_positives: number
    true_negatives: number
    false_positives: number
    false_negatives: number
  }
  total_cases: number
}

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [metrics, setMetrics] = useState<TestMetrics | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [testCount, setTestCount] = useState(100)

  const runTests = async () => {
    setIsLoading(true)
    setError(null)
    setProgress(0)
    
    try {
      // Step 1: Load test data (20% progress)
      setProgress(20)
      const loadResponse = await fetch(`/api/test?action=load-data&limit=${testCount}`)
      
      if (!loadResponse.ok) {
        throw new Error('Failed to load test data')
      }
      
      const testData = await loadResponse.json()
      
      // Step 2: Run evaluation (80% progress)
      setProgress(50)
      
      const evalResponse = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'evaluate',
          test_cases: testData.test_cases,
          actual_labels: testData.actual_labels,
        }),
      })
      
      if (!evalResponse.ok) {
        throw new Error('Failed to evaluate model')
      }
      
      const results = await evalResponse.json()
      
      setProgress(100)
      setMetrics(results)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during testing')
      console.error('Testing error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Model Testing</h1>
            <p className="text-muted-foreground mt-2">
              Run comprehensive tests on the ML model with test data from CSV
            </p>
          </div>

          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
              <CardDescription>
                Configure and run tests on the fracture-flooding prediction model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Number of Test Cases</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={testCount}
                    onChange={(e) => setTestCount(Number.parseInt(e.target.value) || 100)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    disabled={isLoading}
                  />
                </div>
                <div className="pt-6">
                  <Button 
                    onClick={runTests} 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? 'Running Tests...' : 'Run Tests'}
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground text-center">
                    {progress < 30 ? 'Loading test data...' : 
                     progress < 80 ? 'Running predictions...' : 
                     'Calculating metrics...'}
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {metrics && (
            <>
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                    <Badge variant="outline">Overall</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.accuracy.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Correct predictions / Total cases
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Precision</CardTitle>
                    <Badge variant="outline">Positive</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.precision.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      True positives / Predicted positives
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recall</CardTitle>
                    <Badge variant="outline">Sensitivity</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.recall.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      True positives / Actual positives
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
                    <Badge variant="outline">Harmonic</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.f1_score.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Harmonic mean of precision & recall
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Confusion Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Confusion Matrix</CardTitle>
                  <CardDescription>
                    Detailed breakdown of predictions vs actual values
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-green-50 dark:bg-green-950">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">True Positives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {metrics.confusion_matrix.true_positives}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Correctly predicted suitable
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-50 dark:bg-red-950">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">False Positives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                          {metrics.confusion_matrix.false_positives}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Incorrectly predicted suitable
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 dark:bg-orange-950">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">False Negatives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          {metrics.confusion_matrix.false_negatives}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Incorrectly predicted not suitable
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-950">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">True Negatives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {metrics.confusion_matrix.true_negatives}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Correctly predicted not suitable
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-md">
                    <p className="text-sm font-medium">Total Test Cases: {metrics.total_cases}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge variant={metrics.accuracy >= 80 ? "default" : "secondary"}>
                      {metrics.accuracy >= 90 ? "Excellent" : metrics.accuracy >= 80 ? "Good" : "Needs Improvement"}
                    </Badge>
                    <p className="text-sm">
                      The model achieved <strong>{metrics.accuracy.toFixed(2)}%</strong> accuracy on {metrics.total_cases} test cases.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant={metrics.precision >= 80 ? "default" : "secondary"}>
                      Precision
                    </Badge>
                    <p className="text-sm">
                      When predicting "suitable for fracture-flooding", the model is correct <strong>{metrics.precision.toFixed(2)}%</strong> of the time.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant={metrics.recall >= 80 ? "default" : "secondary"}>
                      Recall
                    </Badge>
                    <p className="text-sm">
                      The model identifies <strong>{metrics.recall.toFixed(2)}%</strong> of all cases that are actually suitable for fracture-flooding.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
