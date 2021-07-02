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

function show(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        res.render('routines/show', {routine, title: routine.name})
    });
}

function editRoutine(req, res) {
    Routine.findById(req.params.id, function(err, routine) {
        res.render(`routines/edit`, {title: "UPDATE ROUTINE", routine});
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
        res.render('routines/index', {title: `THE ${req.query.type.toUpperCase()} STALL`, routines})
    })
}