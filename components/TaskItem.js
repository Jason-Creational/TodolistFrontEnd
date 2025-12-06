import React, { useState } from "react";
import { toggleTaskComplete, deleteTask } from "../apis/tasks";
import { useToast } from "./ToastContext";
import { useRouter } from "next/router";

export default function TaskItem({ task, onUpdated, onEdit }) {
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const router = useRouter();

  const handleToggle = async (e) => {
    e?.stopPropagation();
    const checked = e.target.checked;
    setLoading(true);
    try {
      await toggleTaskComplete(task.id, checked);
      showToast(checked ? "Marked completed" : "Marked incomplete", "success");
      if (typeof onUpdated === "function") onUpdated();
      // always refresh page to sync list
      router.reload();
    } catch (err) {
      console.error("Failed to update task:", err);
      showToast(err.message || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    if (!confirm("Delete this task?")) return;
    e?.stopPropagation();
    e?.preventDefault();
    setLoading(true);
    try {
      await deleteTask(task.id);
      showToast("Task deleted", "success");
      if (typeof onUpdated === "function") onUpdated();
      // always refresh page to sync list
      router.reload();
    } catch (err) {
      console.error("Failed to delete task:", err);
      showToast(err.message || "Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (typeof onEdit === "function") {
      onEdit(task);
      return;
    }
    // fallback: navigate to an edit page if exists
    router.push(`/tasks/${task.id}/edit`);
  };

  const formatReadable = (iso) => {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return null;
    }
  };

  const readableDate =
    task?.parsedDateReadable ||
    formatReadable(task?.parsedDate) ||
    formatReadable(task?.due_date) ||
    formatReadable(task?.dueDate) ||
    formatReadable(task?.date);

  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={!!task.completed}
        onChange={handleToggle}
        disabled={loading}
        className="mt-1"
        aria-label="mark completed"
      />
      <div className="flex-1">
        <div className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title || task.name || task.description}
        </div>
        <div className="text-sm text-gray-600">{readableDate || "No date"}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="edit task"
          disabled={loading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          aria-label="delete task"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}