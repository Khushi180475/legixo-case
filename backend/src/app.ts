import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './graphql/schema';
import { root } from './graphql/resolvers';

app.use('/api', routes);
app.all('/graphql', createHandler({ schema, rootValue: root }));

// Basic health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

export default app;
