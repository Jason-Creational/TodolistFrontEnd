import { useEffect, useState } from 'react'
import TaskList from '../components/TaskList'
import TaskInput from '../components/TaskInput'
import { getTasks, createTask, updateTask, deleteTask } from '../apis/tasks'

export default function InboxPage() {
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
    await deleteTask(task.id)
    setTasks(prev => prev.filter(t => t.id !== task.id))
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <TaskInput onAdded={handleAdded} />
      <div className="mt-6">
        <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={handleDelete} />
      </div>
    </div>
  )
}