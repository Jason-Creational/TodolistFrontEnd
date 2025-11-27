import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';
import { getTasks, updateTask, deleteTask } from '../apis/tasks';

export default function TodayPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks('today').then(setTasks); // Corrected to use getTasks
  }, []);

  const toggle = async (task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  const del = async (t) => {
    await deleteTask(t.id);
    setTasks((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Today</h1>
      <TaskInput onAdded={(task) => setTasks((prev) => [task, ...prev])} />
      <TaskList tasks={tasks} onToggleComplete={toggle} onDelete={del} />
    </div>
  );
}