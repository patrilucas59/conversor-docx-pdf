import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function convertDocxToPdf(file: File, signal?: AbortSignal): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/convert", formData, {
      responseType: "blob",
      signal
    });

    return response.data;
    } catch (error: unknown) {
    if (axios.isCancel(error)) {
      throw new Error('Conversão cancelada pelo usuário');
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<Blob>;

      if (axiosError.response?.data instanceof Blob) {
        const text = await axiosError.response.data.text();

        try {
          const json = JSON.parse(text);
          throw new Error(json.error);
        } catch {
          throw new Error(text);
        }
      }
    }

    throw error;
  }
}