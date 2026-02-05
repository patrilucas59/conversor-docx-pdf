import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { convertDocxToPdf } from '../services/docxToPdf.js';
import { safeUnlink } from '../utils/cleanup.js';

const router = Router();
const upload = multer({ dest: 'tmp/' });

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }

  let pdfPath: string | null = null;

  try {
    pdfPath = await convertDocxToPdf(req.file.path);
    res.download(pdfPath);
  } catch {
    res.status(500).json({ error: 'Erro ao converter arquivo' });
  } finally {
    safeUnlink(req.file.path);
    if (pdfPath) safeUnlink(pdfPath);
  }
});

export default router;