import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchProject } from "../../apis/projects";
import { getTasks, createTask, toggleTaskComplete, deleteTask } from "../../apis/tasks";
import { useToast } from "../../components/ToastContext";
import TaskItem from "../../components/TaskItem";
import TaskInput from "../../components/TaskInput";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const showToast = useToast();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const p = await fetchProject(id);
        if (!mounted) return;
        setProject(p || null);

        // fetch all categories and merge so we have active + completed for this project
        const cats = await Promise.all([
          getTasks("inbox"),
          getTasks("today"),
          getTasks("upcoming"),
          getTasks("completed"),
        ]);

        const merged = [];
        const seen = new Set();
        for (const arr of cats) {
          if (!Array.isArray(arr)) continue;
          for (const t of arr) {
            if (!t || seen.has(t.id)) continue;
            seen.add(t.id);
            if (String(t.project_id || t.projectId || "") === String(id)) merged.push(t);
          }
        }
        if (mounted) setTasks(merged);
      } catch (err) {
        console.error(err);
        showToast(err?.message || "Failed to load project", "error");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id, showToast]);

  const refresh = async () => {
    if (!id) return;
    try {
      const cats = await Promise.all([getTasks("inbox"), getTasks("today"), getTasks("upcoming"), getTasks("completed")]);
      const merged = [];
      const seen = new Set();
      for (const arr of cats) {
        if (!Array.isArray(arr)) continue;
        for (const t of arr) {
          if (!t || seen.has(t.id)) continue;
          seen.add(t.id);
          if (String(t.project_id || t.projectId || "") === String(id)) merged.push(t);
        }
      }
      setTasks(merged);
    } catch (err) {
      console.error("Refresh failed", err);
    }
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!form.title?.trim()) {
      showToast("Title required", "error");
      return;
    }
    setCreating(true);
    try {
      await createTask({
        title: form.title,
        description: form.description || null,
        project_id: Number(id),
        date: form.date ? new Date(form.date).toISOString() : null,
      });
      showToast("Task created", "success");
      setForm({ title: "", description: "", date: "" });
      await refresh();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Create failed", "error");
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (task) => {
    try {
      await toggleTaskComplete(task.id, !task.completed);
      showToast(task.completed ? "Marked incomplete" : "Marked completed", "success");
      await refresh();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Update failed", "error");
    }
  };

  const handleDelete = async (task) => {
    if (!confirm("Delete task?")) return;
    try {
      await deleteTask(task.id);
      showToast("Task deleted", "success");
      await refresh();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Delete failed", "error");
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{project?.name || `Project ${id}`}</h1>
          {project?.description && <div className="text-sm text-gray-600">{project.description}</div>}
        </div>
        <div>
          <button onClick={() => router.push("/")} className="px-3 py-2 bg-gray-200 rounded">Back</button>
        </div>
      </div>

      <section className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Create task in this project</h2>
        <TaskInput
          projectId={Number(id)}
          onSaved={async () => {
            setForm({ title: "", description: "", date: "" });
            await refresh();
          }}
        />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Tasks ({tasks.length})</h2>
        {tasks.length === 0 && <div className="text-sm text-gray-500">No tasks in this project.</div>}
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li key={t.id} className="p-3 border rounded">
              <TaskItem task={t} onUpdated={refresh} onEdit={() => router.push(`/tasks/${t.id}/edit`)} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}