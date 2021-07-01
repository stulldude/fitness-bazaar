const Routine = require('../models/routine')

module.exports = {
    new: newRoutine,
    create,
    show,
    edit: editRoutine,
    update: updateRoutine,
    index,
}

function newRoutine(req, res) {
    console.log('---newRoutine()---');
    res.render('routines/new', {title: "Create Routine"});
}

// function newWorkout(req, res) {
//     console.log('---newWorkout()---')
//     let routineId = req.params.id;
//     res.render('workouts/new', {title: "Add to routine", routineId})
// }

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

// function createWorkout(req, res) {
//     Routine.findById(req.params.id, function(err, routine) {
//         console.log('inCreateWorkout Routine')
//         routine.workouts.push(req.body);
//         routine.save(function(err) {
//             console.log('in save')
//             res.redirect(`/routines/${routine._id}`)
//         })
//     })
// }

// function createExercise(req, res) {
//     Routine.findById(req.params.id, function(err, routine) {
//         let workout = routine.workouts.id(req.params.wid);
//         workout.exercises.push(req.body);
//         console.log('hello')
//         routine.save(function(err) {
//             res.redirect(`/routines/${routine._id}`)
//         })
//     });
// }

function show(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        res.render('routines/show', {routine, title: routine.name})
    });
}

// function deleteExercise(req, res, next) {
//     console.log('made it to deleteExercise')
//     Routine.findOne({'workouts._id': req.params.wid}).then(function(routine) {
//         const workout = routine.workouts.id(req.params.wid); 
//         const exercise = workout.exercises.id(req.params.eid);
//         if(!routine.user.equals(req.user._id)) return res.redirect(`/routines/${routine._id}`);
//         exercise.remove();
//         routine.save().then(function() {
//             res.redirect(`/routines/${routine._id}`);
//         }).catch(function(err) {
//             return next(err);
//         });
//     });
// }

// function deleteWorkout(req,res, next) {
//     Routine.findOne({'workouts._id': req.params.wid}).then(function(routine) {
//         const workout = routine.workouts.id(req.params.wid); 
//         if(!routine.user.equals(req.user._id)) return res.redirect(`/routines/${routine._id}`);
//         workout.remove();
//         routine.save().then(function() {
//             res.redirect(`/routines/${routine._id}`);
//         }).catch(function(err) {
//             return next(err);
//         });
//     });
// }

function editRoutine(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        res.render(`routines/edit`, {title: "Update Routine", routine});
    })
}

function updateRoutine(req, res) {
    console.log(req.body)
    Routine.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, routine) {
        if(err || !routine) return res.redirect(`/`);
        res.redirect(`/routines/${req.params.id}`);
    });
}

function index(req, res) {
    console.log(req.query)
    Routine.find(req.query, function(err, routines) {
        console.log('found')
        res.render('routines/index', {title: `The ${req.query.type} Stall`, routines})
    })
}
// function updateWorkout(req, res) {
//     Routine.findOne({'workouts._id': req.params.wid}).then(function(routine) {
//         const workout = routine.workouts.id(req.params.wid);
//         console.log(req.body);
//         workout.name = req.body;
//         routine.save().then(function() {
//             res.redirect(`/routines/${routine._id}`);
//         }).catch(function(err) {
//             return next(err);
//         });
//     })
// }