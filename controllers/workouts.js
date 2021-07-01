const Routine = require('../models/routine');

module.exports = {
    new: newWorkout,
    create,
    delete: deleteWorkout,
}

function newWorkout(req, res) {
    console.log('---newWorkout()---')
    let routineId = req.params.id;
    res.render('workouts/new', {title: "Add to routine", routineId})
}

function create(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        console.log('inCreateWorkout Routine')
        routine.workouts.push(req.body);
        routine.save(function(err) {
            console.log('in save')
            res.redirect(`/routines/${routine._id}`)
        })
    })
}

function deleteWorkout(req,res, next) {
    Routine.findOne({'workouts._id': req.params.wid}).then(function(routine) {
        const workout = routine.workouts.id(req.params.wid); 
        if(!routine.user.equals(req.user._id)) return res.redirect(`/routines/${routine._id}`);
        workout.remove();
        routine.save().then(function() {
            res.redirect(`/routines/${routine._id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}