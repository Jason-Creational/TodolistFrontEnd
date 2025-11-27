export default function TaskItem({ task = {}, onToggleComplete, onDelete }) {
  return (
    <li className="p-4 bg-white rounded shadow-sm flex items-start justify-between">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggleComplete && onToggleComplete(task)}
        />
        <div>
          <div
            className={`font-medium ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </div>
          <div className="text-sm text-gray-500">{task.date || "No date"}</div>
        </div>
      </div>
      <div>
        <button
          onClick={() => onDelete && onDelete(task)}
          className="text-sm text-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
