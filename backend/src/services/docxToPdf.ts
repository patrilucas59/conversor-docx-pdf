import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function convertDocxToPdf(inputPath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const outputDir = path.dirname(inputPath);

    const libreoffice = spawn('libreoffice', [
      '--headless',
      '--convert-to',
      'pdf',
      inputPath,
      '--outdir',
      outputDir,
    ]);

    let stderr = '';

    libreoffice.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    libreoffice.on('close', (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Erro na conversão: ${stderr}`)
        );
      }

      const pdfPath = inputPath.replace(/\.docx$/, '.pdf');

      if (!fs.existsSync(pdfPath)) {
        return reject(
          new Error('PDF não foi gerado')
        );
      }

      const pdfBuffer = fs.readFileSync(pdfPath);

      resolve(pdfBuffer);
    })
  })
}