import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 4 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  adverts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advert' }],
});

userSchema.virtual('contactInfo').get(function() {return `${this.email} ${this.phone}`});

userSchema.post('findOneAndDelete', (user, next) => {
  if (!user) return next();
  mongoose.model('Advert').deleteMany({ author: user._id }, (err, status) => {
    if (err) return next(err);
    next();
  });
});

// TODO authentification
// userSchema.post('save', function() {
//   global.myId = this._id;
//   console.log(global.myId);
// })

const User = mongoose.model('User', userSchema);

export default User;
