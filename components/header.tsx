import { Droplets } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Droplets className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Fracture–Flooding Suitability Prediction System</h1>
            <p className="text-sm text-muted-foreground">AI-powered decision support for well analysis</p>
          </div>
        </div>
      </div>
    </header>
  )
}
