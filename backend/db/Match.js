const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  match: {
    type: Number,
    required: true
  },
  userChoices: [
    {
      name: {
        type: String,
        required: true
      },
      choice: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Match', matchSchema);
