const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: { type: String },
  date: { type: Date },
  time: { type: Number },
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  task: { type: mongoose.Types.ObjectId, ref: 'task' },
  medias: [{ type: String }],
})

schema.set('timestamps', true);

module.exports = mongoose.model(
  "taskreport",
  schema
)
