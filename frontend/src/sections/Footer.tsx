export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">

        <p>
          {new Date().getFullYear()} PDF Machine. Todos os direitos reservados.
        </p>

        <p className="text-center sm:text-right">
          Seus arquivos não são armazenados.
        </p>
      </div>
    </footer>
  )
}