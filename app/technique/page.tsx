import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Droplets, TrendingUp, Zap, Target, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function TechniquePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Hero Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Fracture-Flooding Technique</CardTitle>
                  <CardDescription className="text-base">Enhanced Oil Recovery Through Hydraulic Fracturing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Fracture-flooding is an advanced Enhanced Oil Recovery (EOR) technique that combines hydraulic fracturing with waterflooding to maximize oil extraction from low-permeability reservoirs.
              </p>
            </CardContent>
          </Card>

          {/* What is Fracture-Flooding */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                What is Fracture-Flooding?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Fracture-flooding is a two-phase process designed to enhance oil recovery from tight or low-permeability reservoirs where conventional methods are ineffective.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Phase 1: Hydraulic Fracturing
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    High-pressure fluid is injected to create fractures in the reservoir rock, increasing permeability and creating pathways for oil flow.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Phase 2: Waterflooding
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Water is injected through the created fractures to displace oil toward production wells, sweeping the reservoir more effectively.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reservoir Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive assessment of reservoir properties including porosity, permeability, water saturation, oil saturation, pressure, and fluid viscosity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Suitability Prediction</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered analysis determines if the reservoir characteristics are favorable for fracture-flooding based on historical data and machine learning models.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fracture Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Engineers design the fracturing program including fluid composition, injection rates, pressures, and fracture geometry.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Implementation</h3>
                    <p className="text-sm text-muted-foreground">
                      Hydraulic fracturing is performed followed by strategic waterflooding to maximize oil displacement and recovery.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Parameters */}
          <Card>
            <CardHeader>
              <CardTitle>Key Reservoir Parameters</CardTitle>
              <CardDescription>Critical factors that determine fracture-flooding suitability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Porosity</h3>
                  <p className="text-xs text-muted-foreground">
                    Storage capacity of the rock. Higher porosity typically indicates better potential.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Permeability</h3>
                  <p className="text-xs text-muted-foreground">
                    Fluid flow capability. Low permeability reservoirs benefit most from fracturing.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Water Saturation</h3>
                  <p className="text-xs text-muted-foreground">
                    Lower values indicate more oil present and better displacement potential.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Oil Saturation</h3>
                  <p className="text-xs text-muted-foreground">
                    Higher oil saturation means more recoverable hydrocarbons.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Reservoir Pressure</h3>
                  <p className="text-xs text-muted-foreground">
                    Affects fracture propagation and fluid injection efficiency.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Net Pay Thickness</h3>
                  <p className="text-xs text-muted-foreground">
                    Thicker pay zones provide larger treatment areas and better sweep efficiency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits and Considerations */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>Significantly increases oil recovery from tight reservoirs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>Extends economic life of mature oil fields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>Improves sweep efficiency in heterogeneous reservoirs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>Can be applied at various field development stages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>Reduces overall recovery costs per barrel in suitable conditions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-5 w-5" />
                  Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Requires significant upfront capital investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Not all reservoirs are suitable candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Environmental regulations must be carefully followed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Requires specialized equipment and expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <span>Success depends on accurate reservoir characterization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* AI-Powered Prediction */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>AI-Powered Suitability Prediction</CardTitle>
              <CardDescription>How our system helps optimize fracture-flooding decisions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our prediction system uses an Artificial Neural Network (ANN) trained on historical reservoir data to assess fracture-flooding suitability. The model analyzes multiple parameters simultaneously to provide:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Suitability Assessment</h3>
                  <p className="text-xs text-muted-foreground">Binary classification of whether the reservoir is suitable for fracture-flooding</p>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Confidence Score</h3>
                  <p className="text-xs text-muted-foreground">Percentage indicating the model's confidence in its prediction</p>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Explainable AI</h3>
                  <p className="text-xs text-muted-foreground">Detailed explanations of which factors support or oppose the recommendation</p>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">Field Stage Awareness</h3>
                  <p className="text-xs text-muted-foreground">Considers whether the field is in early-stage, appraisal, or developed phase</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Ready to Analyze Your Reservoir?</h2>
                <p className="text-muted-foreground">
                  Use our AI-powered prediction system to determine if fracture-flooding is suitable for your reservoir
                </p>
                <Link href="/">
                  <Button size="lg" className="gap-2">
                    <Target className="h-4 w-4" />
                    Start Prediction Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
