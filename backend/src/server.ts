import express from 'express';
import router from './routes/convert.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/convert', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});