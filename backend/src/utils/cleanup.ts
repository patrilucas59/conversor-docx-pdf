import fs from 'fs';

export function safeUnlink(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Erro ao remover arquivo:', filePath);
  }
}