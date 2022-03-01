const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a task'],
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
