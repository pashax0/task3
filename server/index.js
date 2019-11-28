const mongoose = require('mongoose');
const User = require('./models/user');
 
mongoose.connect('mongodb://localhost/mongoose_basics', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
  console.log("error connection", err);
})

db.once('open', () => {
  console.log("db connected");
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
  User.find({}, (err, users) => {
    console.log(err, users);
  })
  
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
})
