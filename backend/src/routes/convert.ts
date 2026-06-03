import { Router } from 'express';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import os from 'os';

const router = Router();

router.post('/', (req, res) => {
  const busboy = Busboy({
    headers: req.headers,
  });

  let filePath = '';
  let originalName = '';
  let savePromise: Promise<void> | null = null;

  busboy.on('file', (_fieldName: string, file: NodeJS.ReadableStream, info: Busboy.FileInfo) => {
    const { filename } = info;

    const isDocx = filename.toLowerCase().endsWith('.docx');

    if (!isDocx) {
      file.resume();

      return res.status(400).json({
        error: 'Apenas arquivos DOCX são permitidos',
      });
    }

    originalName = filename;

    filePath = path.join(
      os.tmpdir(),
      `${Date.now()}-${filename}`
    );

    const writeStream = fs.createWriteStream(filePath);

    savePromise = new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    file.pipe(writeStream);
  });

  busboy.on('finish', async () => {
    try {
      if (!savePromise) {
        return res.status(400).json({
          error: 'Nenhum arquivo recebido',
        });
      }

      await savePromise;

      return res.status(200).json({
        success: true,
        originalName,
        filePath,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: 'Erro ao salvar arquivo',
      });
    }
  });

  busboy.on('error', (error) => {
    console.error(error);

    return res.status(500).json({
      error: 'Erro ao processar upload',
    });
  });

  req.pipe(busboy);
});

export default router;