const express = require('express');
const router = express.Router();
const routinesCtrl = require('../controllers/routines.js');

router.get('/new', routinesCtrl.new);
router.get('/', routinesCtrl.index);
router.get('/:id/workouts/new', routinesCtrl.newWorkout);
router.get('/:id/', routinesCtrl.showRoutine)
router.get('/:id/edit', routinesCtrl.edit)
router.post('/:id/workouts', routinesCtrl.createWorkout);
router.post('/:id/workouts/:wid/exercises', routinesCtrl.createExercise);
router.post('/', routinesCtrl.create);
router.put('/:id', routinesCtrl.update);
router.delete('/workouts/:wid/exercises/:eid', routinesCtrl.deleteExercise);
router.delete('/workouts/:wid', routinesCtrl.deleteWorkout);


module.exports = router;