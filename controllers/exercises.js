const Routine = require('../models/routine');

module.exports = {
    create,
    delete: deleteExercise,
}

function create(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        let workout = routine.workouts.id(req.params.wid);
        workout.exercises.push(req.body);
        console.log('hello')
        routine.save(function(err) {
            res.redirect(`/routines/${routine._id}`)
        })
    });
}

function deleteExercise(req, res, next) {
    console.log('made it to deleteExercise')
    Routine.findOne({'workouts._id': req.params.wid}).then(function(routine) {
        const workout = routine.workouts.id(req.params.wid); 
        const exercise = workout.exercises.id(req.params.eid);
        if(!routine.user.equals(req.user._id)) return res.redirect(`/routines/${routine._id}`);
        exercise.remove();
        routine.save().then(function() {
            res.redirect(`/routines/${routine._id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}