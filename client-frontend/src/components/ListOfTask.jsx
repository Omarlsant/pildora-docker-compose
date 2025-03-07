import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const ListOfTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    getTasks();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Tus Tareas</h2>
      <ul className="list-disc pl-5">
        {tasks.map(task => (
          <li key={task.id} className="mb-2">
          <div className="bg-gray-100 p-4 rounded-md shadow">
              <p className="text-sm text-gray-500">ID: {task.id}</p>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
          </div>
      </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfTask;
