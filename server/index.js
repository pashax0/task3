import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user';
import Advert from './models/advert';

import { serverPort } from './ets/config.json';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  // User.deleteMany({}, (err, result) => {
  //   res.sendStatus(result.deletedCount);
  // })
  // Advert.deleteMany({}, (err, result) => {
  //   res.sendStatus(result.deletedCount);
  // })
  // User.find({}, (err, users) => {
  //   if (err) return handleError(err);
  //   res.send(users);
  // });
  // Advert.find({}, (err, adverts) => {
  //   if (err) return handleError(err);
  //   res.send(adverts);
  // })
})

app.post('/', (req, res) => {

})

app.delete('/:id', (req, res) => {
  
})

const user = new User({
  username : 'Three',
  firstName: 'firstName3',
  lastName : 'lastName3',
  email    : 'email3',
  phone    : 'phone3',
})
// user.save();

const advert = new Advert({
  title      : 'Advert two',
  description: 'Advert2',
  category   : 'Advert2',
  price      : 48,
})
// advert.save();

const startServer = () => {
  app.listen(port);
  console.log(`app started on port ${serverPort}`);
}

const connectDb = () => {
  mongoose.connect('mongodb://localhost/mongoose_basics', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose.connection;
}


connectDb()
  .on('error', err => console.log(err))
  .on('disconnected', connectDb)
  .on('open', startServer)

// const mongoose = require('mongoose');
// const User = require('./models/user');
 
// mongoose.connect('mongodb://localhost/mongoose_basics', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on('error', err => {
//   console.log("error connection", err);
// })

// db.once('open', () => {
//   console.log("db connected");
  // const user = new User({name: 'One'});
  // const user = new User({name: 'Two', country: 'US'});
  // user.save();
  // console.log(user);
  // user.save((err, createdUser) => {
  //   console.log('result', err, createdUser);
  // })
  // User.findById('5ddf9580673191534bd46988', (err, User) => {
  //   console.log('result', err, User);
  // })
  // User.find({}, (err, users) => {
  //   console.log(err, users);
  // })
  
  // User.findUserByName('one', (err, user) => {
  //   console.log(err, user);
    // User.findSimilarUsersByCountry((err, users) => {
    //   console.log(err, users);
    // });
    // user.country = 'US';
    // user.save();
    // user.findSimilarUsersByCountry((err, users) => {
    //   console.log(err, users);
    // });
  // })
// })
