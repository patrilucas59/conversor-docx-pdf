import { useState } from "react";
import { Button } from "../components/ui/Button";
import { FileUpload } from "../components/upload/FileUpload";

export function Hero() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <section className="w-full flex flex-col items-center text-center px-6 py-10">
      <div className="max-w-2xl space-y-6">

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Converta arquivos DOCX em PDF
        <span className="block text-zinc-400 text-3xl mt-2">
          rápido, simples e seguro
        </span>
        </h2>

        <FileUpload onFileSelect={setFile} />

        {file && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              Arquivo selecionado: {" "} <strong className="text-white">{file.name}</strong>
            </p>

          <Button>
            Converter
          </Button>
          </div>
        )}

      </div>
    </section>
  )
}