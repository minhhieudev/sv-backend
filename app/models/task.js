const mongoose = require("mongoose");

const STATUS = {
  READY_FOR_WORK: 'READY_FOR_WORK',
  IN_PROGRESS: 'IN_PROGRESS',
  READY_FOR_CHECK: 'READY_FOR_CHECK',
  DONE: 'DONE',
}

const STATUS_LABEL = {
  READY_FOR_WORK: {
    label: 'Chờ thực hiện',
    color: '#4a7297',
  },
  IN_PROGRESS: {
    label: 'Đang thực hiện',
    color: '#259e92'
  },
  READY_FOR_CHECK: {
    label: 'Chờ kiểm tra',
    color: '#ffc500'
  },
  DONE: {
    label: 'Hoàn tất',
    color: '#019335'
  },
}

const schema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  epic: { type: mongoose.Types.ObjectId, ref: 'epic' },
  sprint: { type: mongoose.Types.ObjectId, ref: 'sprint' },
  status: { type: String, default: STATUS.READY_FOR_WORD, enum: Object.keys(STATUS) },
  estimate_time: { type: Number },
  assigned_users: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  current_user: { type: mongoose.Types.ObjectId, ref: 'user' },
  comment: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
})

schema.set('timestamps', true);

schema.statics.STATUS = STATUS
schema.statics.STATUS_LABEL = STATUS_LABEL

module.exports = mongoose.model(
  "task",
  schema
)
