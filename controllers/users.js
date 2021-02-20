/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Список пользователей не найден');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким ID не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          // if (!user) {
          //   throw new NotFoundError('Пользователь с таким ID не найден');
          // }
          res.status(200).send(user);
        })
        .catch(next);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким ID не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('CastError'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('CastError'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      res.send({ message: 'Aутентификация успешна' });
    })
    .catch(next);
};

module.exports = {
  getUserId,
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
