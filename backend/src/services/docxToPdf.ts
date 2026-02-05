import fs from 'fs';
import libre from 'libreoffice-convert';
import { promisify } from 'util';

const convertAsync = promisify(libre.convert);

export async function convertDocxToPdf(inputPath: string): Promise<string> {
    const file = fs.readFileSync(inputPath);

    const pdfBuffer = await convertAsync(file, '.pdf', undefined);

    const outputPath = inputPath.replace(/\.docx$/, '.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    return outputPath;
}