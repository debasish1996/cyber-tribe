const express = require('express');

const convoController = require('../controller/conversation.controller');

const router = express.Router();

router.get('/messages/:id', convoController.getMessagesByFid);
router.get('/directs', convoController.getDirects);
router.post('/:id', convoController.sendMessagesByFid);
router.get('/:id', convoController.getConvoByFid);

module.exports = router;
