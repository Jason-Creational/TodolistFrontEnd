import { useState } from "react";
import { parseDateFromText } from "../apis/nlp";
import { createTask } from "../apis/tasks";

export default function TaskInput({ projectId = null, defaultProjectId = null, onSaved, onAdded }) {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await parseDateFromText(text);
      setParsed(result);

      const pid = projectId ?? defaultProjectId ?? null;
      const payload = {
        title: result?.event || text.trim(),
        date: result?.start_time || null,
        end_date: result?.end_time || null,
        project_id: pid,
        location: result?.location || null,
        reminder_minutes: result?.reminder_minutes ?? null,
      };
      const created = await createTask(payload);
      onAdded && onAdded(created);
      onSaved && onSaved(created);
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
        placeholder="Thêm nhiệm vụ (ví dụ: 'Họp ngày mai 3pm tại quán cà phê, nhắc 30 phút trước')"
        className="w-full p-2 border rounded"
      />
      {parsed?.start_time && (
        <div className="mt-2 text-sm text-gray-600">
          Thời gian: {parsed.start_time_readable}{parsed.end_time ? ` - ${parsed.end_time_readable}` : ""}
        </div>
      )}
      {parsed?.location && (
        <div className="mt-1 text-sm text-gray-600">Địa điểm: {parsed.location}</div>
      )}
      {parsed?.reminder_minutes != null && (
        <div className="mt-1 text-sm text-gray-600">Nhắc trước: {parsed.reminder_minutes} phút</div>
      )}
      <div className="mt-2">
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Đang thêm..." : "Thêm nhiệm vụ"}
        </button>
      </div>
    </form>
  );
}
