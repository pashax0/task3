import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: Number,
  views: { type: Number, min: 0, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' }
});

advertSchema.post('save', (advert, next) => {
  mongoose.model('User').findByIdAndUpdate(advert.author._id, {
    $push: { adverts: advert._id }
  }, (err) => {
    if (err) return next(err);
    next();
  })
})

advertSchema.post('findOneAndDelete', (advert, next) => {
  mongoose.model('User').findByIdAndUpdate(advert.author._id, {
    $pull: { adverts: advert._id }
  }, (err) => {
    if (err) return next(err);
    next();
  })
});

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;
