import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { getTasks } from '../apis/tasks';
import { useRouter } from 'next/router';

export default function CompletedPage() {
  const router = useRouter();
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
      <TaskList tasks={tasks} onEdit={(t) => router.push(`/tasks/${t.id}/edit`)} />
    </div>
  );
}