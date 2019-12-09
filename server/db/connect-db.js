import mongoose from 'mongoose';

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

export default connectDb;
