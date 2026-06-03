import { Router } from 'express';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { convertDocxToPdf } from '../services/docxToPdf';

const router = Router();

router.post('/', (req, res) => {
  const busboy = Busboy({ headers: req.headers });

  let filePath: string | null = null;
  let savePromise: Promise<void> | null = null;

  busboy.on('file', (_, file, info) => {
    const filename = info.filename;

    if (!filename.endsWith('.docx')) {
      file.resume();
      return;
    }

    filePath = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
    const writeStream = fs.createWriteStream(filePath);

    savePromise = new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    file.pipe(writeStream);
  });

  busboy.on('finish', async () => {
    try {
      if (!savePromise || !filePath) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      await savePromise;

      const pdfBuffer = await convertDocxToPdf(filePath);

      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');

      return res.send(pdfBuffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro na conversão' });
    }
  });

  busboy.on('error', (err) => {
    console.error(err);
    return res.status(500).json({ error: 'Erro no upload' });
  });

  req.pipe(busboy);
});

export default router;