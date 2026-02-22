import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { convertDocxToPdf } from '../services/docxToPdf';
import { safeUnlink } from '../utils/cleanup';

const convertRouter = Router();
const upload = multer({ dest: 'tmp/' });

convertRouter.post('/', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }
  console.log("arquivo recebido:", req.file.path);

  let pdfPath: string | null = null;

  try {
    pdfPath = await convertDocxToPdf(req.file.path);
    safeUnlink(req.file.path);
    res.download(pdfPath, (err) => {
      if (pdfPath) safeUnlink(pdfPath);
      
      if (err) {
        console.error("Erro ao enviar arquivo:", err);
      }
    });
    
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Erro ao converter arquivo' });
}

});

export default convertRouter;