const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default: ''
        },
        priority: {
            type: String,
            enum: {
                values: ['Low', 'Medium', 'High'],
                message: 'Priority must be Low, Medium, or High'
            },
            default: 'Medium'
        },
        dueDate: {
            type: Date,
            required: [true, 'Due date is required']
        },
        status: {
            type: String,
            enum: {
                values: ['Pending', 'Completed'],
                message: 'Status must be Pending or Completed'
            },
            default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

// Index for better query performance
taskSchema.index({ status: 1, priority: 1, dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);