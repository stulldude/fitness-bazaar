const Routine = require('../models/routine')

module.exports = {
    new: newRoutine,
    newWorkout: newWorkout,
    create: create,
    createWorkout: createWorkout,
    createExercise: createExercise,
    showWorkout: showWorkout,
}

function newRoutine(req, res) {
    console.log('---newRoutine()---');
    res.render('routines/new', {title: "Create Routine"});
}

function newWorkout(req, res) {
    console.log('---newWorkout()---')
    let routineId = req.params.id;
    res.render('workouts/new', {title: "Add to routine", routineId})
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const routine = new Routine(req.body);
    console.log(routine);
    routine.save(function(err) {
        console.log(err)
        if (err) return res.redirect('/routines/new')
        res.redirect(`/routines/${routine._id}/workouts/new`)
    })
}

function createWorkout(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        console.log('inCreateWorkout Routine')
        routine.workouts.push(req.body);
        routine.save(function(err) {
            console.log('in save')
            res.redirect(`/routines/${routine._id}/workouts/${routine.workouts._id}`)
        })
    })
}

function createExercise(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        routine.workouts.findById(req.params.wid, function(err, workout) {
            workout.exercises.push(req.body);
            console.log('hello')
            routine.save(function(err) {
                res.redirect(res.redirect(`/routines/${routine._id}/workouts/${workout._id}`))
            })
        })
    });
}

function showWorkout(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        res.render('workouts/show', {routine, title: routine.name})
    });
}