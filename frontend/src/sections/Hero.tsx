import { useState } from "react";
import { Button } from "../components/ui/Button";
import { FileUpload } from "../components/upload/FileUpload";

type UploadState = "idle" | "ready" | "converting" | "done"

export function Hero() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>("idle")

  function handleFileSelect(selectedFile: File) {
    setFile(selectedFile)
    setState("ready")
  }

  async function handleConvert() {
    if (!file) return

    setState("converting")

    await new Promise(resolve => setTimeout(resolve, 2000))

    setState("done")
  }

  function handleDownload() {
    alert("Download iniciado! (simulação)")
  }

  return (
    <section className="w-full flex flex-col items-center text-center px-6 py-10">
      <div className="max-w-2xl space-y-6">

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Converta arquivos DOCX em PDF
        <span className="block text-zinc-400 text-3xl mt-2">
          rápido, simples e seguro
        </span>
        </h2>

        <FileUpload onFileSelect={handleFileSelect} />

        {file && (
            <p className="text-sm text-zinc-400">
              Arquivo selecionado: {" "} <strong className="text-white">{file.name}</strong>
            </p>
          )}

        {state === "ready" && (
          <Button onClick={handleConvert}>
            Converter
          </Button>
        )}

        {state === "converting" && (
          <Button isPending disabled>
            Convertendo...
          </Button>
        )}

        {state === "done" && (
          <Button color="success" onClick={handleDownload}>
            Baixar PDF
          </Button>
        )}

      </div>
    </section>
  )
}