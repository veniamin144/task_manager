import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import * as api from './api';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const res = await api.getTasks();
      setTasks(res.data);
    } catch (e) {
      setError('Не удалось загрузить задачи');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (data) => {
    await api.createTask(data);
    loadTasks();
  };

  const handleStatusChange = async (id, status) => {
    await api.updateStatus(id, status);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>AI Task Manager</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm onCreated={handleCreate} />
      <TaskTable
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}

