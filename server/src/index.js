import express from 'express';
// import cors from 'cors';

import connectDb from './models';
import routes from './routes';
import { models } from 'mongoose';

const SERVER_PORT = "3333";
const DB_ADDRESS = "mongodb://localhost/mongoose_one";

const app = express();
const db = connectDb(DB_ADDRESS);

db.on('error', (error) => {
  console.error('Database connection error', error);
});
db.on('disconnected', () => console.log('Database disconnected'));
db.once('open', () => console.log('Database connected'));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(authentificate);
app.use('/api/users', routes.user);
app.use('/api/adverts', routes.advert);
app.use(errorHandler);

function authentificate(req, res, next) {
  // req.me = models.User.findByName('Test');
  req.myId = '5dedfcd93f019d516a63fc34';
  // console.log(req.me._id);
  next();
}

function errorHandler(err, req, res, next) {
  res.status(500).send(`Error: ${err}`);
}

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});


// app.use((req, res, next) => {
//   req.context = {
//     models,
//     // me: models.users[1],
//   };
//   next();
// });

// const eraseDatabaseOnSync = true;

// const createUsersWithMessages = async () => {
//   const user1 = new models.User({
//     username: 'rwieruch',
//   });
//   const message1 = new models.Message({
//     text: 'Published the Road to learn React',
//     user: user1.id,
//   });
//   await message1.save();
//   await user1.save();
// };

// connectDb().then(async () => {
//   if (eraseDatabaseOnSync) {
//     await Promise.all([
//       models.User.deleteMany({}),
//       models.Message.deleteMany({}),
//     ]);

//     createUsersWithMessages();
//   }

