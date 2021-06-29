const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: String,
    rating: Number,
    content: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 1, max: 5, default: 5},
}, {
    timestamps: true,
});

const exerciseSchema = new Schema ({
    name: String, // EX: Bench
    sets: Number,
    reps: Number,
    rroi: Number  // recommended rate of increase
}, {
    timestamps: true,
});

const workoutSchema = new Schema({
    name: String,  // EX: Chest and Back day, Cardio day
    exercises: [exerciseSchema],
}, {
    timestamps: true,
});

const routineSchema =  new Schema({
    id: String,
    name: String,  // EX: 5x5 Stronglifts
    type: String,
    creatorTips: String,
    length: Number,
    workouts: [workoutSchema],
    comments: [commentSchema],
    tags: [String],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Routine', routineSchema);