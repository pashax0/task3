import mongoose from 'mongoose';
// mongoose.Promise = global.Promise;

const connectDb = (db_address) => {
  mongoose.connect(db_address,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  return mongoose.connection;
};

export default connectDb;
