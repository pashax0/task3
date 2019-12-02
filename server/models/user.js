import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username : String,
  firstName: String,
  lastName : String,
  email    : String,
  phone    : String,
})

userSchema.virtual('fullName').get(() => {
  return `${this.firstName} ${this.lastName}`;
})

userSchema.statics.findUserByName = function(name, cb) {
  return this.findOne({username: new RegExp(name, 'i')}, cb);
}

// userSchema.methods.findSimilarUsersByCountry = function(cb) {
//   // return this.model('User').find({country: this.country}, cb);
//   return this.model('User')
//     .where('country', this.country)
//     .where('_id').ne(this.id)
//     .exec(cb)
// }

const User = mongoose.model('User', userSchema);

export default User;
