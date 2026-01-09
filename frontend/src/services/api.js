const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Task API functions
export const taskAPI = {
    // Get all tasks with optional filters
    getAllTasks: async (filters = {}) => {
        const queryParams = new URLSearchParams();
        
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.priority) queryParams.append('priority', filters.priority);
        if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
        if (filters.order) queryParams.append('order', filters.order);

        const queryString = queryParams.toString();
        const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
        
        return apiCall(endpoint);
    },

    // Get single task by ID
    getTaskById: async (id) => {
        return apiCall(`/tasks/${id}`);
    },

    // Create new task
    createTask: async (taskData) => {
        return apiCall('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    },

    // Update task
    updateTask: async (id, taskData) => {
        return apiCall(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData)
        });
    },

    // Delete task
    deleteTask: async (id) => {
        return apiCall(`/tasks/${id}`, {
            method: 'DELETE'
        });
    }
};

export default taskAPI;