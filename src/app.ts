import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Route
app.use('/api/v1', routes);

// Api route entry point
app.get('/', (req, res) => {
  const bookFinderPostgreSql = `
  <div style="text-align: center; font-family: Poppins, sans-serif;">
      <p style="font-size: 10rem;"> 💻🖥📡🛢</p>
      <p style="font-size: 35px;"> Welcome to Product Wizardry Webpage. </p>
  </div>
`;
  res.send(bookFinderPostgreSql);
});

//global error handler
app.use(globalErrorHandler);

// Not Found API Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
