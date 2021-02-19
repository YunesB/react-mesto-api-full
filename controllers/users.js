/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('CastError'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.message === 'CastError') {
        return res.status(404).send({ message: 'Incorrect Inquiry, ID not found' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      }
      res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  console.log({
    name, about, avatar, email, password,
  });
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
          res.status(200).send(user);
        })
        .catch((err) => {
          console.log(err);
          if (err.name === 'CastError') {
            return res.status(400).send({ message: 'Incorrect Inquiry' });
          } if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
          }
          res.status(500).send({ message: err.message });
        });
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('CastError'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      }
      return res.status(500).send({ message: err.message });
    });
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

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      res.send({ message: 'Aутентификация успешна' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
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
