import { Header } from './components/layout/Header'
import { Button } from './components/ui/Button'
import { Hero } from './sections/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <Header />

      <Hero />

      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm px-6">
          <Button variant="solid" className="w-full" color="error">
            Converter
          </Button>

          <Button variant="outline" className="w-full" color="success">
            Cancelar
          </Button>

          <Button className="w-full" color="primary">
            Excluindo
          </Button>
        </div>
      </main>
    </div>
  )
}