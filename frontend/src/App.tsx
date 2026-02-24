import { Header } from './sections/Header'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'

export default function App() {
  return (
    <div className="h-screen bg-zinc-900 text-zinc-100 flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto custom-scroll">
        <Hero />
      </main>

      <Footer />
    </div>
  )
}