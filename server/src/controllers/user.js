import User from '../models/user';

export function addUser(req, res, next) {
  const { body } = req;
  const user = new User({
    username : body.username,
    firstName: body.firstName,
    lastName : body.lastName,
    email    : body.email,
    phone    : body.phone,
  });
  
  user.save(err => {
    if (err) return next(err);
    res.send(user);
  });
}

export function getUserList(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.send(users);
  })
}

export function getUserWithAdvertsById(req, res, next) {
  User
    .findById(req.params.id)
    .populate('adverts')
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.send(user);
    })
}

export function updateUserById(req, res, next) {
  const { body } = req;
  User.findByIdAndUpdate(body._id, body, {runValidators: true, new: true}, (err, user) => {
    if (!user || (err && err.name === 'CastError')) return res.status(400).send({ error: 'User not found' });
    if (err) return next(err);
    res.send(user);
  })
}

export function deleteUserById(req, res, next) {
  const { body } = req;
  User.findByIdAndDelete(body._id, (err, user) => {
    if (!user || (err && err.name === 'CastError')) return res.status(400).send({ error: 'User not found' });
    if (err) return next(err);
    res.send(user);
  });
}
