import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: Number,
  views: { type: Number, min: 0, default: 0 },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
  user: { type: String},
});

// advertSchema.pre('save', () => console.log('Hello from pre save'));

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;
