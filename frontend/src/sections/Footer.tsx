export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950">
      <div className="px-6 py-2 flex items-center justify-center text-sm text-zinc-500">

        <p className="text-center">
          © {new Date().getFullYear()} PDF Machine | Todos os direitos reservados | Lucas Patrício
        </p>

      </div>
    </footer>
  )
}