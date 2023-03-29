const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  estimate_time: { type: Number },
  start_date: { type: Date },
  end_date: { type: Date },
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
})

schema.set('timestamps', true);

module.exports = mongoose.model(
  "sprint",
  schema
)
