const express = require('express');
const router = express.Router();
const routinesCtrl = require('../controllers/routines.js');

router.get('/new', routinesCtrl.new);
router.get('/:id/workouts/new', routinesCtrl.newWorkout);
router.get('/:id/', routinesCtrl.showRoutine)
router.post('/:id/workouts', routinesCtrl.createWorkout);
router.post('/:id/workouts/:wid/exercises', routinesCtrl.createExercise);
router.post('/', routinesCtrl.create);

module.exports = router;