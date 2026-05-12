import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/convert';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://pdf-machine.vercel.app',
}))

app.use('/convert', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});