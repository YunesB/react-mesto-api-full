const router = require('express').Router();
const contoller = require('../controllers/cards');

router.get('/cards', contoller.getCards);
router.post('/cards', contoller.createCard);
router.delete('/cards/:cardId', contoller.deleteCard);

router.put('/cards/:cardId/likes', contoller.likeCard);
router.delete('/cards/:cardId/likes', contoller.dislikeCard);

module.exports = router;
