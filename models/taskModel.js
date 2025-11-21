const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    task_title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', TaskSchema);
