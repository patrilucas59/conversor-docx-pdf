import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import path from 'path';
import { convertDocxToPdf } from '../services/docxToPdf';
import { safeUnlink } from '../utils/cleanup';

const convertRouter = Router();
const upload = multer({ dest: 'tmp/', fileFilter: (req, file, cb) => {
  const allowedMime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (file.mimetype !== allowedMime) {
    return cb (new Error('Apenas arquivos .docx são permitidos'));
  }

  cb(null, true);
},
});

convertRouter.post('/', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }

  const originalName = path.parse(req.file.originalname).name;
  const outputFileName = `${originalName}.pdf`;

  try {
    const pdfBuffer = await convertDocxToPdf(
      req.file.path,
      req.file.originalname
    )

    safeUnlink(req.file.path);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${outputFileName}"`,
    );

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    safeUnlink(req.file.path);
    return res.status(500).json({ error: 'Erro ao converter arquivo.' });
  }
}
);

export default convertRouter;