const express = require('express');

const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/me', userController.getMe);
router.get('/:id', userController.getUser);
router.post('/', userController.postCreateProfile);

module.exports = router;
