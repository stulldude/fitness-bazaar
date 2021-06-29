const Routine = require('../models/routine')

module.exports = {
    new: newRoutine,
}

function newRoutine(req, res) {
    res.render('routines/new', {title: "Create Routine"});
}