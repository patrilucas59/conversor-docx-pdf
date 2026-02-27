import axios from "axios";

export const api = axios.create({
    baseURL: 'https://conversor-docx-pdf.onrender.com',
})

export async function convertDocxToPdf(file: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post("/convert", formData, {
        responseType: "blob",
    });

    return response.data;
}