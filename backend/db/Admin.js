const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    match:Number,
    team1:String,
    team2:String,
    win:String
});

module.exports = mongoose.model("admin",adminSchema);
