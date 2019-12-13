import Advert from '../models/advert';

export function addAdvert(req, res, next) {
  const { body } = req;
  const advert = new Advert({
    title      : body.title,
    description: body.description,
    category   : body.category,
    price      : body.price,
    author     : req.myId,
  });
  
  advert.save(err => {
    if (err) return next(err);
    res.send(advert);
  });
}

export function getAdvertList(req, res, next) {
  const { sortBy = 'created', sortSign = 'asc' } = req.body;

  Advert
    .find({})
    .sort({[sortBy]: sortSign})
    .exec((err, adverts) => {
      if (err) return next(err);
      res.send(adverts);
    })
}

export function getAdvertByIdWithContacts(req, res, next) {
  Advert
    .findById(req.params.id)
    .populate('author')
    .exec((err, advert) => {
      if (err) return next(err);
      if (!advert) return res.status(404).send({ error: 'Advert not found' });
      advert.views += 1;
      advert.save({timestamps: false},(err, advert) => {
        if (err) return next(err);
        res.send(advert);
      });
    })
}

export function updateAdvertById(req, res, next) {
  const { body } = req;
  Advert.findByIdAndUpdate(body._id, body, {runValidators: true, new: true}, (err, advert) => {
    if (err) return next(err);
    res.send(advert);
  })
}

export function deleteAdvertById(req, res, next) {
  const { body } = req;
  Advert.findByIdAndDelete(body._id, (err, advert) => {
    if (err) return next(err);
    res.send(advert);
  })
}


