import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onToggleComplete, onDelete }) {
  if (!tasks.length) return <p className="text-gray-500">No tasks.</p>;
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
