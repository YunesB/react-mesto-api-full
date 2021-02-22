/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Список карточек не найден');
      }
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Введены некорректные данные');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Список карточек не найден'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('У Вас недостаточно прав, чтобы совершить это действие');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Указанная карточка не найдена'))
    .then((likesArray) => res.status(200).send(likesArray))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Указанная карточка не найдена'))
    .then((likesArray) => res.status(200).send(likesArray))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
