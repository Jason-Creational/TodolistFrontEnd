import { useState } from "react";
import { createProject } from "../apis/projects";

export default function ProjectModal({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleCreate = async () => {
    if (!name.trim()) return;
    const project = await createProject({ name });
    onCreated && onCreated(project);
    setName("");
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-green-50 text-green-700 rounded"
      >
        + Add project
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="mb-3 font-semibold">New project</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64 p-2 border rounded"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCreate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Create
              </button>
              <button onClick={() => setOpen(false)} className="px-3 py-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
