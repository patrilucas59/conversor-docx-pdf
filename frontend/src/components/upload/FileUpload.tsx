import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    }
  })

  return (
    <div {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-10 transition cursor-pointer
      ${isDragActive ? "border-blue-500 bg-zinc-900" : "border-zinc-700"}
      `}
    >
      <input {...getInputProps()}/>

      <p className="text-zinc-400">
        {isDragActive ? "Solte o arquivo aqui..." : "Arraste seu arquivo ou clique para selecionar"}
      </p>
    </div>
  )
}