import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
  console.log('Headers:', req.headers);

  let bytes = 0;

  req.on('data', (chunk) => {
    bytes += chunk.length;
  });

  req.on('end', () => {
    console.log('Bytes recebidos:', bytes);

    res.json({
      bytes,
    });
  });
});

export default router;