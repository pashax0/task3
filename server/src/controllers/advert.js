import Advert from '../models/advert';

export function getAdvertList(req, res, next) {
  Advert.find({}, (err, adverts) => {
    if (err) return next(err);
    res.send(adverts);
  })
}

export function addAdvert(req, res, next) {
  const { body } = req;
  // const advert = new Advert({
  //   title      : body.title,
  //   description: body.description,
  //   category   : body.category,
  //   price      : body.price,
  // });
  const advert = new Advert({
    title: 'Advert 4',
    description: 'Description of advert 2',
    category: 'Two',
    price: 40,
    // user: req.me,
    user: req.myId,
  });
  advert.save(err => {
    if (err) return next(err);
    res.send(advert);
  });
}

export function getAdvertById(req, res, next) {
  Advert.findById(req.params.id, (err, advert) => {
    if (!advert) return res.status(400).send({ error: 'Not found' });
    advert.views += 1;
    advert.save(err => {
      if (err) return next(err);
      res.send(advert);
    });
  })
}

export function updateAdvertById(req, res, next) {
  const { body } = req;
  Advert.findById(req.params.id, (err, advert) => {
    if (!advert) return res.status(400).send({ error: 'Not found' });
    advert = Object.assign(advert, body);
    advert.modified = Date.now();
    advert.save(err => {
      if (err) return next(err);
      res.send(advert);
    });
  })
}

export function deleteAdvertById(req, res) {
  Advert.deleteOne({_id: req.params.id}, (err, status) => {
    res.send(status);
  });
}
