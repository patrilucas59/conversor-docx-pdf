import { useState } from "react";
import { Button } from "../components/ui/Button";
import { FileUpload } from "../components/upload/FileUpload";
import { convertDocxToPdf } from "../services/api";
import { useSnackbar } from "notistack";

type UploadState = "idle" | "converting" | "done";

export function Hero() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [state, setState] = useState<UploadState>("idle");

  const { enqueueSnackbar } = useSnackbar();

  const isIdle = state === "idle";
  const isConverting = state === "converting";
  const isDone = state === "done";

  function handleFileSelect(selectedFile: File) {
    setFile(selectedFile);
    setPdfBlob(null);
    setState("idle");
  }

  async function handleConvert() {
    if (!file) return;

    setState("converting");

    try {
    const blob = await convertDocxToPdf(file);
    setPdfBlob(blob);
    setState("done");
  } catch {
    setState("idle");
    enqueueSnackbar(
      "Erro ao converter o arquivo. Por favor, tente novamente.", 
      { variant: "error" }
    );
  }
}

  function handleDownload() {
    if (!pdfBlob || !file) return;

    const url = URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(".docx", ".pdf");
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setState("idle");
    setFile(null);
    setPdfBlob(null);
  }

  const buttonConfig = {
    label: isConverting ? "Convertendo..."  : isDone ? "Baixar PDF": "Converter",
    onClick: isDone ? handleDownload : handleConvert,
    isPending: isConverting,
    disabled: isConverting,
  }

  return (
    <section className="w-full flex flex-col items-center text-center px-6 py-10">
      <div className="max-w-2xl space-y-5">

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Converta arquivos DOCX em PDF
        <span className="block text-zinc-400 text-3xl mt-2">
          rápido, simples e seguro
        </span>
        </h2>

        <FileUpload 
          onFileSelect={handleFileSelect}
          onInvalidFile={() => 
            enqueueSnackbar("Apenas documentos DOCX podem ser adicionados ´para conversão.", { 
              variant: "warning"
             })
          } 
        />

        {file && (
            <p className="text-sm text-zinc-400">
              Arquivo selecionado:{" "} 
                <strong className="text-white">{file.name}</strong>
            </p>
          )}

        {!isIdle && (
          <div className="flex justify-center">
            <Button 
              onClick={buttonConfig.onClick}
              isPending={buttonConfig.isPending}
              disabled={!file || isConverting}
              >
              {buttonConfig.label}
            </Button>
          </div>
        )}

        {isDone && (
          <p className="text-green-400 text-sm">
            Conversão concluída com sucesso!
          </p>
        )}

        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Converta gratuitamente <span className="text-white font-bold">1 arquivo DOCX</span> por vez.
          Seus arquivos não são armazenados e são excluídos automaticamente após a conversão.
        </p>

      </div>
    </section>
  )
}