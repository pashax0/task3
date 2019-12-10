import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  adverts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advert' }],
});

userSchema.virtual('contactInfo').get(function() {return `${this.email} ${this.phone}`});

// TODO delete adverts of user
// userSchema.pre('deleteOne', function(next) {
//   mongoose.model('Advert').deleteMany({ author: this._id }, next);
// });

// TODO authentification
// userSchema.post('save', function() {
//   global.myId = this._id;
//   console.log(global.myId);
// })

const User = mongoose.model('User', userSchema);

export default User;
