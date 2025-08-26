// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import modelRoutes from './routes/modelRoutes';
import entryRoutes from './routes/entryRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/health', (req, res) => res.send('OK'));

app.use('/users', userRoutes);
app.use('/models', modelRoutes);
app.use('/entries', entryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});