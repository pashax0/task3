import express from 'express';
import cors from 'cors';

import connectDb from './models/database';
import routes from './routes';
import * as middlewares from './middlewares';

const SERVER_PORT = "3333";
const DB_ADDRESS = "mongodb://localhost/mongoose_one";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewares.auth);
app.use('/api/users', routes.user);
app.use('/api/adverts', routes.advert);
app.use(middlewares.errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
  connectDb(DB_ADDRESS)
    .on('error', (error) => {
      console.error('Database connection error', error.name);
      process.exit();
    })
    .once('open', () => console.log('Database connected'));
});
