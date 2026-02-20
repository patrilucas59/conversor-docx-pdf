import { Header } from './components/Header'
import { Button } from './components/Button'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />

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