import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks = [],
  loading = false,
  onToggle,
  onDelete,
  onEdit,
  onServerSearch = null,
  enableSearch = true,
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query?.trim()) return tasks || [];
    const q = query.toLowerCase();
    return (tasks || []).filter((t) => {
      const parts = [
        t?.title,
        t?.description,
        t?.location,
        t?.parsedDateReadable,
        t?.date,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return parts.includes(q);
    });
  }, [tasks, query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && typeof onServerSearch === "function") {
      onServerSearch(query);
    }
  };

  return (
    <div>
      {enableSearch && (
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm nhiệm vụ..."
            className="w-full p-2 border rounded"
          />
          <div className="mt-1 text-xs text-gray-500">
            {filtered.length} kết quả
            {query && (
              <button
                onClick={() => setQuery("")}
                className="ml-3 text-blue-500 text-xs"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      )}

      {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}

      {!loading && filtered.length === 0 && (
        <div className="p-4 text-sm text-gray-500">No tasks.</div>
      )}

      <ul className="space-y-3">
        {filtered.map((t) => (
          <li key={t.id} className="p-3 border rounded">
            <TaskItem
              task={t}
              onUpdated={() => onToggle && onToggle(t)}
              onEdit={() => onEdit && onEdit(t)}
              onDelete={() => onDelete && onDelete(t)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
