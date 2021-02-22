const router = require('express').Router();
const controller = require('../controllers/users');
const validateReq = require('../middlewares/validator');

router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserId);
router.get('/users/me', validateReq.validateUserId, controller.getUserInfo);

router.patch('/users/me', validateReq.validateUserInfo, controller.updateUser);
router.patch('/users/avatar', validateReq.validateAvatarUpdate, controller.updateAvatar);

module.exports = router;
