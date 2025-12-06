import { useEffect, useState } from 'react'
import TaskList from '../components/TaskList'
import TaskInput from '../components/TaskInput'
import { getTasks, createTask, updateTask, deleteTask } from '../apis/tasks'
import { useRouter } from 'next/router';

export default function InboxPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([])
  useEffect(() => { load() }, [])
  async function load() {
    const data = await getTasks('inbox')
    setTasks(data)
  }
  async function handleAdded(task) { setTasks(prev => [task, ...prev]) }
  async function toggleComplete(task) {
    const updated = await updateTask(task.id, { completed: !task.completed })
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t))
  }
  async function handleDelete(task) {
    // optimistic update: remove from UI immediately
    const prevTasks = tasks;
    setTasks(prev => prev.filter(t => t.id !== task.id));

    try {
      await deleteTask(task.id);
    } catch (err) {
      // revert on error
      console.error("Delete failed", err);
      setTasks(prevTasks);
      alert(err?.message || "Failed to delete task");
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <TaskInput onAdded={handleAdded} />
      <div className="mt-6">
        <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={handleDelete} onEdit={(t) => router.push(`/tasks/${t.id}/edit`)} />
      </div>
    </div>
  )
}