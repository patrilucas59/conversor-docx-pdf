import { Button } from "../components/ui/Button";

export function Hero() {
  return (
    <main className="flex-1">
    <section className="w-full flex flex-col items-center text-center px-6 py-10">
      <div className="max-w-2xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Converta arquivos DOCX em PDF
        <small className="block text-zinc-400 text-3xl mt-2">
          rápido, simples e seguro
        </small>
        </h2>

        <p className="text-zinc-400 text-lg">
          Faça upload do seu arquivo .docx e receba o PDF instantaneamente.
          Nenhum arquivo é armazenado em nossos serviços.
        </p>

        <div className="mt-8">
          <Button>
            Selecionar arquivo
          </Button>
        </div>

      </div>
    </section>
    </main>
  )
}