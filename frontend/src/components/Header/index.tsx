export function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zin-950">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-white">
          PDF Machine
        </h1>

        <span className="text-sm text-zinc-400 hidden sm:block">
          Conversor DOCX para PDF
        </span>
      </div>
    </header>
  )
}