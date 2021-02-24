const router = require('express').Router();
const controller = require('../controllers/users');
const validateReq = require('../middlewares/validator');

router.get('/users', controller.getUsers);
router.get('/users/me', controller.getUserInfo);
router.get('/users/:id', validateReq.validateUserId, controller.getUserId);

router.patch('/users/me', validateReq.validateUserInfo, controller.updateUser);
router.patch('/users/me/avatar', validateReq.validateAvatarUpdate, controller.updateAvatar);

module.exports = router;
