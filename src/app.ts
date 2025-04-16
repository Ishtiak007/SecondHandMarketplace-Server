import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

// parser
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// application routes
app.use('/api/v1', router);

// check server health
app.get('/', (req: Request, res: Response) => {
  res.send('SecondHandMarketplace Assignment Server is Running');
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
