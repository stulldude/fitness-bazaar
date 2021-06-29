const Routine = require('../models/routine')

module.exports = {
    new: newRoutine,
    create: create,
    newWorkout: newWorkout,
}

function newRoutine(req, res) {
    console.log('---newRoutine()---');
    res.render('routines/new', {title: "Create Routine"});
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

function newWorkout(req, res) {
    console.log('---newWorkout()---')
    res.render('workouts/new', {title: "Add to routine"})
}