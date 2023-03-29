const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
})

schema.set('timestamps', true);


// TODO
// method calculate percent complete of epic

module.exports = mongoose.model(
  "epic",
  schema
)
