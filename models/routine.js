const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema ({
    name: String, // EX: Bench
    sets: Number,
    reps: Number,
    rroi: Number  // recommended rate of increase
}, {
    timestamps: true
})

const workoutSchema = new Schema({
    name: String,  // EX: Chest and Back day, Cardio day
    exercises: [exerciseSchema],
}, {
    timestamps: true
});

const routineSchema =  new Schema({
    id: String,
    name: String,  // EX: 5x5 Stronglifts
    type: String,
    routine: [workoutSchema],
    tags: [String],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Routine', routineSchema);