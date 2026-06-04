import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function convertDocxToPdf(inputPath: string): Promise<Buffer> {
  const outputDir = os.tmpdir();

  await execAsync(
    `soffice --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`
  );

  const pdfPath = path.join(
    outputDir,
    path.basename(inputPath, '.docx') + '.pdf'
  );

  if (!fs.existsSync(pdfPath)) {
    throw new Error('PDF não foi gerado');
  }

  const pdfBuffer = fs.readFileSync(pdfPath);

  fs.unlinkSync(pdfPath);

  return pdfBuffer;
}