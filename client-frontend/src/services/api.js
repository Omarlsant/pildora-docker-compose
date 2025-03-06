import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/tasks',
});

export const fetchTasks = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export default api;
