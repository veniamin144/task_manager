import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data);
export const updateStatus = (id, status) =>
  axios.put(`${API_URL}/tasks/${id}`, { status });
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);