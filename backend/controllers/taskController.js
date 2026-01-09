const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const { status, priority, sortBy, order } = req.query;

        const filter = {};
        if (status && ['Pending', 'Completed'].includes(status)) {
            filter.status = status;
        }
        if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
            filter.priority = priority;
        }

        let sort = { createdAt: -1 };
        if (sortBy === 'dueDate') {
            sort = { dueDate: order === 'desc' ? -1 : 1 };
        } else if (sortBy === 'priority') {
            sort = { priority: order === 'desc' ? -1 : 1 };
        } else if (sortBy === 'createdAt') {
            sort = { createdAt: order === 'desc' ? -1 : 1 };
        }

        const tasks = await Task.find(filter).sort(sort);

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching tasks'
        });
    }
};

// Get single task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching task'
        });
    }
};

// Create task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Task title is required'
            });
        }

        if (!dueDate) {
            return res.status(400).json({
                success: false,
                message: 'Due date is required'
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            priority: priority || 'Medium',
            dueDate: new Date(dueDate),
            status: status || 'Pending'
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while creating task'
        });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (priority !== undefined) updateData.priority = priority;
        if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
        if (status !== undefined) updateData.status = status;

        task = await Task.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while updating task'
        });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error while deleting task'
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};