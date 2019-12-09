import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  email    : { type: String, required: true },
  phone    : { type: String, required: true },
});

userSchema.statics.findByName = function(name) {
  const user = this.findOne({
    username: name,
  }, (err, findingUser) => {
    if (err) return console.log('User not found');
    return findingUser;
  });
  console.log(Object.values(user));
  if (!user) {//Think about it
    return {error: 'Please authentificate'};
  }
  // console.log(user);
  return user;
};

userSchema.pre('deleteOne', (next) => {
  this.model('Advert').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;
