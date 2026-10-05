import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/tasks', tasksRouter);

// обработка 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;