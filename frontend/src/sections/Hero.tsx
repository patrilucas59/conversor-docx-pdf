import { useState } from "react";
import { Button } from "../components/ui/Button";
import { FileUpload } from "../components/upload/FileUpload";
import { convertDocxToPdf } from "../services/api";

type UploadState = "idle" | "ready" | "converting" | "done"

export function Hero() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [state, setState] = useState<UploadState>("idle");

  function handleFileSelect(selectedFile: File) {
    setFile(selectedFile);
    setPdfBlob(null);
    setState("ready");
  }

  async function handleConvert() {
    if (!file) return;

    setState("converting");

    try {
    const blob = await convertDocxToPdf(file);
    setPdfBlob(blob);
    setState("done");
  } catch (error) {
    console.error(error);
    setState("ready");
  }
}

  function handleDownload() {
    if (!pdfBlob || !file) return;

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(".docx", ".pdf");
    a.click(); 
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
              Arquivo selecionado:{" "} 
                <strong className="text-white">{file.name}</strong>
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