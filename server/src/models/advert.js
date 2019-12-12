import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: Number,
  views: { type: Number, min: 0, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
}, {
  timestamps: {}
});

advertSchema.post('save', (advert, next) => {
  if (!advert) return next();
  mongoose.model('User').findById(advert.author._id, (err, user) => {
    if (err) return next(err);
    user.adverts.push(advert._id);
    user.save(err => {
      if (err) return next(err);
      next();
    })
  })
})

advertSchema.post('findOneAndDelete', (advert, next) => {
  mongoose.model('User').findById(advert.author._id, (err, user) => {
    if (err) return next(err);
    user.adverts = user.adverts.filter(advertId => advertId != advert._id.toString());
    user.save(err => {
      if (err) return next(err);
      next();
    })
  })
});

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;
