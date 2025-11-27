import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { getTasks } from '../apis/tasks';

export default function CompletedPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks('completed'); // Fetch tasks for "completed"
    setTasks(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Completed</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}