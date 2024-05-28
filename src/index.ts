import express, { Request, Response } from 'express';
require('dotenv').config(); // Load .env file

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hello, world!',
  });
});

app.listen(+port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
