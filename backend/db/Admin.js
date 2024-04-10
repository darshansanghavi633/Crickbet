const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    match: Number,
    team1: String,
    team2: String,
    win: String,
    postTime: {
        type: Date,
        default: Date.now // Set default value to current timestamp
    }
});

module.exports = mongoose.model("admin", adminSchema);
