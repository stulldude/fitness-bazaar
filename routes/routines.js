const express = require('express');
const router = express.Router();
const routinesCtrl = require('../controllers/routines.js');

router.get('/new', routinesCtrl.new);
router.get('/:id/workouts/new', routinesCtrl.newWorkout)
router.post('/', routinesCtrl.create)

module.exports = router;