import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';
import { getTasks, updateTask, deleteTask } from '../apis/tasks';
import { useRouter } from 'next/router';

export default function UpcomingPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks('upcoming'); // Fetch tasks for "upcoming"
    setTasks(data);
  };

  const toggleTaskCompletion = async (task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  const deleteTaskHandler = async (task) => {
    await deleteTask(task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming</h1>
      <TaskInput onAdded={(task) => setTasks((prev) => [task, ...prev])} />
      <div className="mt-6">
        <TaskList
        tasks={tasks}
        onToggle={toggleTaskCompletion}
        onDelete={deleteTaskHandler}
        onEdit={(t) => router.push(`/tasks/${t.id}/edit`)}
      />
      </div>
    </div>
  );
}