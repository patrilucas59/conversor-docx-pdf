import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function convertDocxToPdf(inputPath: string): Promise<Buffer> {
  const outputDir = os.tmpdir();
  
  const sofficeCommand =
    process.platform === 'win32'
      ? '"C:\\Program Files\\LibreOffice\\program\\soffice.exe"'
      : 'soffice';

    await execAsync(
      `${sofficeCommand} --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`
    );

  const pdfPath = path.join(
    outputDir,
    path.basename(inputPath, '.docx') + '.pdf'
  );

  if (!fs.existsSync(pdfPath)) {
    throw new Error('PDF não foi gerado');
  }

  try {
    return fs.readFileSync(pdfPath);
  } finally {
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
  }
}