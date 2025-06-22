// routes/ContactRoute.js
const express = require('express');
const router = express.Router();
const { addContactMessage, getAllMessages, sendReply } = require('../Controllers/ContactController');

router.post('/addContact', addContactMessage);
router.get('/getContacts', getAllMessages);
router.post('/sendReply', sendReply);

module.exports = router;
