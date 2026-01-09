import { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending'
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title || '',
                description: editingTask.description || '',
                priority: editingTask.priority || 'Medium',
                dueDate: editingTask.dueDate 
                    ? new Date(editingTask.dueDate).toISOString().split('T')[0] 
                    : '',
                status: editingTask.status || 'Pending'
            });
            setErrors({});
            setTouched({});
        }
    }, [editingTask]);

    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                if (!value.trim()) {
                    return 'Task title is required';
                }
                if (value.trim().length < 3) {
                    return 'Title must be at least 3 characters';
                }
                if (value.trim().length > 100) {
                    return 'Title cannot exceed 100 characters';
                }
                return '';
            case 'dueDate':
                if (!value) {
                    return 'Due date is required';
                }
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today && !editingTask) {
                    return 'Due date cannot be in the past';
                }
                return '';
            case 'description':
                if (value.length > 500) {
                    return 'Description cannot exceed 500 characters';
                }
                return '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        setErrors(newErrors);
        setTouched({
            title: true,
            description: true,
            priority: true,
            dueDate: true,
            status: true
        });

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
            if (!editingTask) {
                setFormData({
                    title: '',
                    description: '',
                    priority: 'Medium',
                    dueDate: '',
                    status: 'Pending'
                });
                setTouched({});
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'Medium',
            dueDate: '',
            status: 'Pending'
        });
        setErrors({});
        setTouched({});
        onCancelEdit();
    };

    const isFormValid = () => {
        const currentErrors = validateForm();
        return Object.keys(currentErrors).length === 0 && 
               formData.title.trim() !== '' && 
               formData.dueDate !== '';
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className="task-form-container">
            <h2 className="form-title">
                {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Task Title <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`form-input ${errors.title && touched.title ? 'input-error' : ''}`}
                        placeholder="Enter task title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.title && touched.title && (
                        <span className="error-message">{errors.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className={`form-textarea ${errors.description && touched.description ? 'input-error' : ''}`}
                        placeholder="Enter task description (optional)"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.description && touched.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
                    <span className="char-count">
                        {formData.description.length}/500
                    </span>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="priority" className="form-label">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            className="form-select"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate" className="form-label">
                            Due Date <span className="required">*</span>
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            className={`form-input ${errors.dueDate && touched.dueDate ? 'input-error' : ''}`}
                            min={!editingTask ? getTodayDate() : undefined}
                            value={formData.dueDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.dueDate && touched.dueDate && (
                            <span className="error-message">{errors.dueDate}</span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-actions">
                    {editingTask && (
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!isFormValid()}
                    >
                        {editingTask ? 'Update Task' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;