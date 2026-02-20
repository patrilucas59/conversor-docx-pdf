import { Header } from './components/layout/Header'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}