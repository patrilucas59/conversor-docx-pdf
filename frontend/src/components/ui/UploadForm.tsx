import { useState } from "react";
import { convertDocxToPdf } from "../../services/api";

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [isPending, setIsPending] = useState(false); 

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!file) return;

        try {
            setIsPending(true);

            const pdfBlob = await convertDocxToPdf(file);

            const url = window.URL.createObjectURL(pdfBlob);

            const fileDownload = document.createElement('a');
            fileDownload.href = url;
            fileDownload.download = 'arquivo.pdf';
            fileDownload.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Erro ao converter');
            console.error(error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
                type="file" 
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}     
            />

            <button
                type="submit"
                disabled={!file || isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {isPending ? 'Convertendno' : 'Converter para PDF'}
            </button>
        </form>
    );
}