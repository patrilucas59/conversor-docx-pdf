import { Router } from "express";
import Busboy from "busboy";
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

  busboy.on('file', (fieldName, file, info) => {
    const { filename, mimeType } = info;

    if (
      mimeType !==
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return res.status(400).json({ error: 'Arquivo inválido' });
    }

    originalName = filename;

    filePath = path.join(os.tmpdir(), filename);

    const writeStream = fs.createWriteStream(filePath);

    file.pipe(writeStream);

    writeStream.on('close', async () => {
      console.log('Arquivo foi salvo');
    });
  });

  busboy.on('finish', async () => {
    try {
      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro na conversão',
      });
    }
  });

  req.pipe(busboy);
});

export default router;