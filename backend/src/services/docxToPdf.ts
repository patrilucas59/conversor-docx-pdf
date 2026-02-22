import fs from 'fs';
import libre from 'libreoffice-convert';
import { promisify } from 'util';

const libreConvert = promisify(libre.convert);

export async function convertDocxToPdf(inputPath: string): Promise<string> {
  const file = fs.readFileSync(inputPath);

  const pdfBuffer = await libreConvert(file, '.pdf', undefined);

  const outputPath = `${inputPath}.pdf`;

  fs.writeFileSync(outputPath, pdfBuffer);

  return outputPath;
}