const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercises.js');


router.post('/routines/:id/workouts/:wid/exercises', exerciseCtrl.create);
router.delete('/workouts/:wid/exercises/:eid', exerciseCtrl.delete);

module.exports = router;