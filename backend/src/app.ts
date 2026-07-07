import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

app.use('/api', routes);

// Basic health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

export default app;
