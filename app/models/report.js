const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  time: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  type: { type: String },
})

schema.set('timestamps', true);

schema.statics.REPORT_TYPE = {
  CHECKIN: 'checkin',
  CHECKOUT: 'checkout'
}

const model = mongoose.model(
    "report",
    schema
);

module.exports = model;
