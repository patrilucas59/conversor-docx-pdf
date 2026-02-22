import express from 'express';
import convertRouter from './routes/convert';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json());

app.use('/convert', convertRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

console.log("SERVER VERSION 2");