const express = require('express');
const router = express.Router();
const routinesCtrl = require('../controllers/routines.js');

router.get('/new', routinesCtrl.new);

module.exports = router;