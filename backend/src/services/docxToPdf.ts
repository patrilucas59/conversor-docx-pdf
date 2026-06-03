import mammoth from 'mammoth';
import PDFDocument from 'pdfkit';

export async function convertDocxToPdf(inputPath: string): Promise<Buffer> {
  const result = await mammoth.extractRawText({ path: inputPath });

  const text = result.value;

  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(12).text(text || 'Documento vazio');

    doc.end();
  });
}