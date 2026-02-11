import { Button } from './components/Button'

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-6">
          PDF Machine
        </h1>

        <Button variant="solid" className="w-full" color='error'>
          Converter
        </Button>

        <Button variant="outline" className="w-full" color='success'>
          Cancelar
        </Button>

        <Button className="w-full" color='primary'>
          Excluindo
        </Button>
      </div>
    </div>
  )
}