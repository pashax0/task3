import mongoose from 'mongoose';

import Advert from '../models/advert';
import User from '../models/user';

export function addAdvert(req, res, next) {
  const { body } = req;
  const advertId = new mongoose.Types.ObjectId();
  const advert = new Advert({
    _id        : advertId,
    title      : body.title,
    description: body.description,
    category   : body.category,
    price      : body.price,
    author     : req.myId,
  });
  
  User.findById(req.myId, (err, user) => {
    if (err) return next(err);
    user.adverts.push(advertId);
    user.save(err => {
      if (err) return next(err);
    });
  })

  advert.save(err => {
    if (err) return next(err);
    res.send(advert);
  });
}

export function getAdvertList(req, res, next) {
  const { sortBy } = req.body || 'created';
  const sortSign = req.body.sortSign || 'asc';
  Advert
    .find({})
    .sort({[sortBy]: sortSign})
    .exec((err, adverts) => {
      if (err) return next(err);
      const advertsTitles = adverts.map(advert => advert.title);//TODO returned values
      res.send(adverts);
    })
}

export function getAdvertByIdWithContacts(req, res, next) {
  Advert
    .findOne({_id: req.params.id})
    .populate('author')
    .exec((err, advert) => {
      if (!advert) return res.status(400).send({ error: 'Not found' });
      advert.views += 1;
      advert.save(err => {
        if (err) return next(err);
      });
      const authorContacts = advert.author.contactInfo;
      const advertWithAuthorInfo = Object.assign({}, advert._doc);
      delete advertWithAuthorInfo.author;
      advertWithAuthorInfo.contactInfo = authorContacts;
      res.send(advertWithAuthorInfo);
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
  User.findById(req.myId, (err, user) => {
    if (err) return next(err);
    user.adverts = user.adverts.filter(advert => advert != req.params.id);
    user.save(err => {
      if (err) return next(err);
    });
  })

  Advert.deleteOne({_id: req.params.id}, (err, status) => {
    res.send(status);
  });
}
