const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
    // owner: Joi.string(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});

module.exports = {
  validateUserInfo,
  validateAvatarUpdate,
  validateUserId,
  validateLogin,
  validateCardCreation,
  validateCardId,
};
