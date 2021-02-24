const router = require('express').Router();
const contoller = require('../controllers/cards');
const validateReq = require('../middlewares/validator');

router.get('/cards', contoller.getCards);
router.post('/cards', validateReq.validateCardCreation, contoller.createCard);
router.delete('/cards/:cardId', validateReq.validateCardId, contoller.deleteCard);

router.put('/cards/:cardId/likes', validateReq.validateCardId, contoller.likeCard);
router.delete('/cards/:cardId/likes', validateReq.validateCardId, contoller.dislikeCard);

module.exports = router;
