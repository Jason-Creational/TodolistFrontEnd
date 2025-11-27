import { useState } from "react";
import { parseDateFromText } from "../apis/nlp";
import { createTask } from "../apis/tasks";

export default function TaskInput({ defaultProjectId = null, onAdded }) {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      // NLP parse
      const result = await parseDateFromText(text);
      setParsed(result);

      // create task
      const payload = {
        title: text,
        date: result?.parsedDate || null,
        projectId: defaultProjectId,
      };
      const created = await createTask(payload);
      onAdded && onAdded(created);
      setText("");
      setParsed(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task (e.g. 'Meeting next Friday at 2pm')"
        className="w-full p-2 border rounded"
      />
      {parsed?.parsedDate && (
        <div className="mt-2 text-sm text-gray-600">
          Detected date: {parsed.parsedDate}
        </div>
      )}
      <div className="mt-2">
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
