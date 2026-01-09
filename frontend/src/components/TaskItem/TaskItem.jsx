import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = () => {
        if (task.status === 'Completed') return false;
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today;
    };

    const isDueToday = () => {
        if (task.status === 'Completed') return false;
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        return dueDate.toDateString() === today.toDateString();
    };

    const getPriorityClass = () => {
        switch (task.priority) {
            case 'High':
                return 'priority-high';
            case 'Medium':
                return 'priority-medium';
            case 'Low':
                return 'priority-low';
            default:
                return '';
        }
    };

    const handleStatusToggle = () => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        onStatusChange(task._id, newStatus);
    };

    return (
        <div className={`task-item ${task.status === 'Completed' ? 'task-completed' : ''} ${isOverdue() ? 'task-overdue' : ''}`}>
            <div className="task-checkbox">
                <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={handleStatusToggle}
                    id={`task-${task._id}`}
                />
                <label htmlFor={`task-${task._id}`} className="checkbox-label"></label>
            </div>

            <div className="task-content">
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-badges">
                        <span className={`priority-badge ${getPriorityClass()}`}>
                            {task.priority}
                        </span>
                        <span className={`status-badge ${task.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                            {task.status}
                        </span>
                    </div>
                </div>

                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}

                <div className="task-footer">
                    <div className="task-meta">
                        <span className={`due-date ${isOverdue() ? 'overdue' : ''} ${isDueToday() ? 'due-today' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {isOverdue() && <span className="overdue-label">Overdue: </span>}
                            {isDueToday() && <span className="today-label">Today: </span>}
                            {formatDate(task.dueDate)}
                        </span>
                    </div>

                    <div className="task-actions">
                        <button 
                            className="action-btn edit-btn" 
                            onClick={() => onEdit(task)}
                            title="Edit Task"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button 
                            className="action-btn delete-btn" 
                            onClick={() => onDelete(task._id)}
                            title="Delete Task"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;