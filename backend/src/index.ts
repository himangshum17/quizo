import express from 'express';
const app = express();

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

app.get('/test', (req: express.Request, res: express.Response) => {
  res.send('its working...');
});
