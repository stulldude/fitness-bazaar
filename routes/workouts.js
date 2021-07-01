const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts.js');

router.get('/routines/:id/workouts/new', workoutsCtrl.new);
router.post('/routines/:id/workouts', workoutsCtrl.create);
router.delete('/workouts/:wid', workoutsCtrl.delete);

module.exports = router;