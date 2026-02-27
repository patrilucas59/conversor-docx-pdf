import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function convertDocxToPdf(file: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post("/convert", formData, {
        responseType: "blob",
    });

    return response.data;
}