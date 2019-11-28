const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  country: String,
})

userSchema.statics.findUserByName = function(name, cb) {
  return this.findOne({name: new RegExp(name, 'i')}, cb);
}

userSchema.methods.findSimilarUsersByCountry = function(cb) {
  // return this.model('User').find({country: this.country}, cb);
  return this.model('User')
    .where('country', this.country)
    .where('id').ne(this.id)
    .exec(cb)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
