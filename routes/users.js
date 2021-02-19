const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserId);
router.get('/users/me', controller.getUserInfo);

router.patch('/users/me', controller.updateUser);
router.patch('/users/avatar', controller.updateAvatar);

module.exports = router;
