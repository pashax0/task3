import express from 'express';
// import cors from 'cors';

import connectDb from './models/database';
import routes from './routes';

const SERVER_PORT = "3333";
const DB_ADDRESS = "mongodb://localhost/mongoose_one";

const app = express();
const db = connectDb(DB_ADDRESS);
let dbError = false;

db.on('error', (error) => {
  dbError = 'Database connection error';
  console.error('Database connection error', error.name);
});
db.once('open', () => console.log('Database connected'));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(authentificate);
app.use('*', dbErrorHandler);
app.use('/api/users', routes.user);
app.use('/api/adverts', routes.advert);
app.use(errorHandler);

function dbErrorHandler(req, res, next) {
  if (dbError) {
    next(dbError);
  } else {
    next();
  }
}

function authentificate(req, res, next) {
  req.myId = '5def5c5e574d1e5c194f0f70';//TODO add authentification
  next();
}

function errorHandler(err, req, res, next) {
  res.status(500).send(`Error: ${err}`);
}

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
