import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList';
import Filter from '../../components/Filter/Filter';
import Notification from '../../components/Notification/Notification';
import { taskAPI } from '../../services/api';
import './Home.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [notification, setNotification] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        sortBy: 'createdAt',
        order: 'desc'
    });

    // Show notification
    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    // Close notification
    const closeNotification = () => {
        setNotification(null);
    };

    // Fetch tasks
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await taskAPI.getAllTasks(filters);
            setTasks(response.data);
        } catch (error) {
            showNotification(error.message || 'Failed to fetch tasks', 'error');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Create task
    const handleCreateTask = async (taskData) => {
        try {
            const response = await taskAPI.createTask(taskData);
            setTasks(prevTasks => [response.data, ...prevTasks]);
            showNotification('Task created successfully!', 'success');
        } catch (error) {
            showNotification(error.message || 'Failed to create task', 'error');
        }
    };

    // Update task
    const handleUpdateTask = async (taskData) => {
        try {
            const response = await taskAPI.updateTask(editingTask._id, taskData);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === editingTask._id ? response.data : task
                )
            );
            setEditingTask(null);
            showNotification('Task updated successfully!', 'success');
        } catch (error) {
            showNotification(error.message || 'Failed to update task', 'error');
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await taskAPI.deleteTask(taskId);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            showNotification('Task deleted successfully!', 'success');
        } catch (error) {
            showNotification(error.message || 'Failed to delete task', 'error');
        }
    };

    // Update task status
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const response = await taskAPI.updateTask(taskId, { status: newStatus });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? response.data : task
                )
            );
            showNotification(
                `Task marked as ${newStatus.toLowerCase()}!`,
                'success'
            );
        } catch (error) {
            showNotification(error.message || 'Failed to update status', 'error');
        }
    };

    // Handle form submit (create or update)
    const handleFormSubmit = (taskData) => {
        if (editingTask) {
            handleUpdateTask(taskData);
        } else {
            handleCreateTask(taskData);
        }
    };

    // Start editing task
    const handleEditTask = (task) => {
        setEditingTask(task);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    // Handle filter change
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="home">
            <Header taskCount={tasks.length} />
            
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}

            <main className="main-content">
                <div className="content-container">
                    <div className="left-panel">
                        <TaskForm
                            onSubmit={handleFormSubmit}
                            editingTask={editingTask}
                            onCancelEdit={handleCancelEdit}
                        />
                    </div>
                    
                    <div className="right-panel">
                        <Filter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                        <TaskList
                            tasks={tasks}
                            loading={loading}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;