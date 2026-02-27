import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export async function convertDocxToPdf(inputPath: string, originalName: string): Promise<Buffer> {
  const API_KEY = process.env.CLOUDCONVERT_API_KEY;

  const jobResponse = await axios.post(
    'https://api.cloudconvert.com/v2/jobs',
    {
      tasks: {
        'import-file': {
          operation: 'import/upload',
        },
        'convert-file': {
          operation: 'convert',
          input: 'import-file',
          output_format: 'pdf',
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file',
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const uploadTask = jobResponse.data.data.tasks.find(
    (task: any) => task.name === 'import-file'
  );

  const formData = new FormData();
  const uploadUrl = uploadTask.result.form.url;

  Object.entries(uploadTask.result.form.parameters).forEach(
    ([key, value]) => {
      formData.append(key, value as string);
    }
  );

  formData.append('file', fs.createReadStream(inputPath), {
    filename: originalName,
  });

  await axios.post(uploadUrl, formData, {
    headers: formData.getHeaders(),
  });

  const jobId = jobResponse.data.data.id;

  let jobStatus = 'waiting';
  let job;

  while (jobStatus !== 'finished') {
    const statusResponse = await axios.get(
      `https://api.cloudconvert.com/v2/jobs/${jobId}?include=tasks`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    job = statusResponse.data.data;
    jobStatus = job.status;

    if (jobStatus === 'error') {
      console.error('Erro detalhado:', job);
      throw new Error('Erro na conversão');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const exportTask = job.tasks.find(
    (task: any) => task.name === 'export-file'
  );

  if (!exportTask || !exportTask.result?.files?.length) {
    throw new Error('Arquivo exportado não encontrado');
  }

  const fileUrl = exportTask.result.files[0].url;

  const pdfResponse = await axios.get(fileUrl, {
    responseType: 'arraybuffer',
  });

  return Buffer.from(pdfResponse.data);
}