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
    const userNames = users.map(user => user.username);//TODO returned values
    res.send(users);
  })
}

export function getUserById(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err);
    res.send(user);
  })
}

export function getUserWithAdvertsById(req, res, next) {
  User
    .findById(req.params.id)
    .populate('adverts')
    .exec((err, user) => {
      if (!user) return res.status(400).send({ error: 'Not found' });
      res.send(user);
    })
}

export function updateUserById(req, res) {
  const { body } = req;
  User.findById(req.params.id, (err, user) => {
    if (!user) return res.status(400).send({ error: 'Not found' });
    user = Object.assign(user, body);
    user.save();
    res.send(user);
  })
}

export function deleteUserById(req, res, next) {
  User.deleteOne({_id: req.params.id}, (err, status) => {
    res.send(status);
  });
}
