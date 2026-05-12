import { access, unlink } from "fs/promises";

export async function safeUnlink(filePath: string): Promise<void> {
  try {
    await access(filePath);
    await unlink(filePath);
  } catch (error) {
    console.error(`Erro ao remover arquivo: ${filePath}`);
  }
}