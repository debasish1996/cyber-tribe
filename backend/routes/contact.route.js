const express = require('express');

const contact = require('../controller/contact.controller');

const router = express.Router();

router.post('/request', contact.sendFriendRequest);
router.post('/accept', contact.acceptFriendReq);

//developer's route
router.get('/reset', contact.reset);

router.get('/', contact.getContact);

module.exports = router;
