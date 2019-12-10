import mongoose from 'mongoose';

const connectDb = (db_address) => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(db_address,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => err);
  mongoose.Promise = global.Promise;
  return mongoose.connection;
};

export default connectDb;
