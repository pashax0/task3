import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const advertShema = new Schema({
  title      : { type: String, required: true},
  created    : { type: Date, default   : Date.now},
  modified   : { type: Date, default   : Date.now },
  description: String,
  category   : { type: String, required: true },
  price      : Number,
  views      : { type: Number, min     : 0, default: 0 },
  // author: { type: Schema.Types.ObjectId, ref: 'User'}
})

const Advert = mongoose.model('Advert', advertShema);

export default Advert;
