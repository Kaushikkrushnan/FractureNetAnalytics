import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Database, LineChart, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About FractureNetAnalytics</h1>
          <p className="text-xl text-muted-foreground">
            Advanced AI-powered prediction system for fracture-flooding suitability analysis in oil and gas reservoirs
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              FractureNetAnalytics is designed to revolutionize the way petroleum engineers evaluate reservoir suitability 
              for fracture-flooding enhanced oil recovery techniques. By leveraging artificial neural networks and machine 
              learning, we provide fast, accurate, and data-driven predictions that help optimize production strategies and 
              maximize resource recovery.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Advanced neural network model trained on extensive reservoir data
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Our ANN model analyzes 8 critical reservoir parameters to provide accurate suitability predictions 
                with confidence scores.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-Time Predictions</CardTitle>
                <CardDescription>
                  Instant analysis and results in seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Get immediate feedback on reservoir suitability, enabling faster decision-making and project planning.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <LineChart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Explainable AI</CardTitle>
                <CardDescription>
                  SHAP-based explanations for transparency
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Understand why the model makes specific predictions with detailed AI explanations for each parameter.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Comprehensive Parameters</CardTitle>
                <CardDescription>
                  8 critical reservoir characteristics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Evaluates porosity, saturation levels, depth, pressure, viscosity, permeability, and development stage.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Validated Model</CardTitle>
                <CardDescription>
                  Rigorously tested and validated
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Comprehensive testing ensures reliable predictions across various reservoir types and conditions.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>User-Friendly Interface</CardTitle>
                <CardDescription>
                  Intuitive design for all users
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Clean, professional interface that makes complex analysis accessible to engineers at all levels.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
            <CardDescription>Powered by cutting-edge technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Frontend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Next.js 14 - React framework for production</li>
                  <li>• TypeScript - Type-safe development</li>
                  <li>• Tailwind CSS - Modern styling framework</li>
                  <li>• Shadcn/ui - High-quality UI components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Backend & ML</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Python Flask - API server</li>
                  <li>• TensorFlow/Keras - Neural network model</li>
                  <li>• scikit-learn - Data preprocessing</li>
                  <li>• SHAP - Model explainability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>The prediction process in three steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Input Reservoir Parameters</h3>
                  <p className="text-muted-foreground">
                    Enter 8 key reservoir characteristics including porosity, saturation levels, depth, pressure, 
                    viscosity, permeability, and field development stage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our trained artificial neural network processes the inputs, applying learned patterns from 
                    historical reservoir data to predict fracture-flooding suitability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Get Results & Insights</h3>
                  <p className="text-muted-foreground">
                    Receive a suitability prediction with confidence score and detailed AI explanations showing 
                    which parameters most influenced the decision.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Use Cases</CardTitle>
            <CardDescription>Applications in petroleum engineering</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Preliminary screening of candidate wells for fracture-flooding projects</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Optimization of enhanced oil recovery strategies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Risk assessment and project planning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Educational tool for petroleum engineering students</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Research and development in EOR techniques</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact/Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>Ready to analyze your reservoir?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Start using FractureNetAnalytics today to make data-driven decisions about fracture-flooding suitability.
            </p>
            <Link href="/">
              <Button className="w-full md:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
