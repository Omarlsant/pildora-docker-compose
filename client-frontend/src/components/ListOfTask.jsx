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
            <strong>{task.name}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfTask;
