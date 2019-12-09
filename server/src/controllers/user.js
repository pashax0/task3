import User from '../models/user';


export function getUserList(req, res, next) {
  User.find({}, (err, user) => {
    if (err) next(err);
    res.send(user);
  })
}

export function addUser(req, res) {
  const { body } = req;
  // const user = new User({
  //   username : body.username,
  //   firstName: body.firstName,
  //   lastName : body.lastName,
  //   email    : body.email,
  //   phone    : body.phone,
  // });
  const user = new User({
    username : 'Test',
    firstName: 'firstName2',
    lastName : 'lastName2',
    email    : 'email2',
    phone    : 'phone2',
  })
  user.save();
  res.send(user);
}

export function getUserById(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err);
    res.send(user);
  })
}

export function updateUserById(req, res) {
  const { body } = req;
  User.findById(req.params.id, (err, user) => {
    if (err) return handleError(err);
    user = Object.assign(user, body);
    user.save();
    res.send(user);
  })
}

export function deleteUserById(req, res, next) {
  User.deleteOne({_id: req.params.id}, (err, status) => {
    if (err) next(err);
    res.send(status);
  });
}

export default User;
