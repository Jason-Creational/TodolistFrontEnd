import axios from '../utils/axiosInstance';

// Get all tasks
export const getTasks = async (category, filter) => {
  try {
    // Construct query parameters dynamically
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (filter) params.append('filter', filter);

    const res = await axios.get(`/tasks?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Return temporary data if an error occurs
    return [
      {
        id: 'temp-1',
        name: 'Temporary Task 1',
        description: 'This is a placeholder task.',
        completed: category === 'completed',
      },
      {
        id: 'temp-2',
        name: 'Temporary Task 2',
        description: 'This is another placeholder task.',
        completed: category === 'completed',
      },
    ];
  }
};

// Get one task by ID
export const getTask = async (id) => {
  try {
    const res = await axios.get(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Return temporary data if 404 is encountered
      return {
        id,
        name: 'Temporary Task',
        description: 'This is a placeholder task.',
        completed: false,
      };
    }
    throw error; // Re-throw other errors
  }
};

// Create a new task
export const createTask = async (payload) => {
  const res = await axios.post('/tasks', payload);
  return res.data;
};

// Update existing task
export const updateTask = async (id, payload) => {
  const res = await axios.put(`/tasks/${id}`, payload);
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
  return res.data;
};