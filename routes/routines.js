const express = require('express');
const router = express.Router();
const routinesCtrl = require('../controllers/routines.js');

router.get('/new', routinesCtrl.new);
router.get('/', routinesCtrl.index);
router.get('/:id/', routinesCtrl.show)
router.get('/:id/edit', routinesCtrl.edit)
router.post('/', routinesCtrl.create);
router.put('/:id', routinesCtrl.update);


module.exports = router;