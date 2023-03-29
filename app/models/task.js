const mongoose = require("mongoose");

const STATUS = {
  READY_FOR_WORD: 'READY_FOR_WORD',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_CHECK: 'READY_FOR_CHECK',
  DONE: 'DONE',
}

const STATUS_LABEL = {
  READY_FOR_WORD: 'READY_FOR_WORD',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_CHECK: 'READY_FOR_CHECK',
  DONE: 'DONE',
}

const schema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  epic: { type: mongoose.Types.ObjectId, ref: 'epic' },
  sprint: { type: mongoose.Types.ObjectId, ref: 'sprint' },
  status: { type: String, default: STATUS.READY_FOR_WORD },
  estimate_time: { type: Number },
  assigned_users: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  current_user: { type: mongoose.Types.ObjectId, ref: 'user' },
})

schema.set('timestamps', true);

schema.statics.STATUS = STATUS
schema.statics.STATUS_LABEL = STATUS_LABEL

module.exports = mongoose.model(
  "task",
  schema
)
