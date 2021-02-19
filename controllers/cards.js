/* eslint-disable no-unused-vars */
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: 'File read error' });
    });
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      } if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Incorrect Inquiry, Card not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((likesArray) => res.status(200).send(likesArray))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      } if (err.name === 'TypeError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, TypeError' });
      } if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Incorrect Inquiry, Card not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((likesArray) => res.status(200).send(likesArray))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect Inquiry' });
      } if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect Inquiry, Validation Error' });
      } if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Incorrect Inquiry, Card not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
