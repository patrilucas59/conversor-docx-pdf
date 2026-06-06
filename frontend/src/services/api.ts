import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export async function convertDocxToPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/convert", formData, {
      responseType: "blob",
    });

    return response.data;
    } catch (error: unknown) {
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