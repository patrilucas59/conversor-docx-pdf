import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export async function convertDocxToPdf(file: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/convert', formData, {
        headers: {
            'Content-Type': 'multipart/formdata',
        },
        responseType: 'blob',
    });

    return response.data;
}