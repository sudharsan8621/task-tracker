import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange }) {
    if (loading) {
        return (
            <div className="task-list-loading">
                <div className="loading-spinner"></div>
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3>No tasks found</h3>
                <p>Create a new task to get started or adjust your filters.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h3 className="task-list-title">Your Tasks</h3>
                <span className="task-count-badge">{tasks.length}</span>
            </div>
            <div className="task-list-items">
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskList;