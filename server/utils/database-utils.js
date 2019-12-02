import mongoose from 'mongoose';
import User from '../models/user';
import Advert from '../models/advert';

export function getUsers() {
  return User.find();
}

export function createUser() {
  const user = new User({
    username : String,
    firstName: String,
    lastName : String,
    email    : String,
    phone    : String,
  });

  return user.save();
}

export function deleteUser(id) {
  return User.findById(id).remove();
}
