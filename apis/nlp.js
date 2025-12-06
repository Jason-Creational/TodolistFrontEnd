import api from "../utils/axiosInstance";

function formatReadable(iso) {
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
}

export async function parseDateFromText(text) {
  try {
    const resp = await api.post("/nlp", { text });
    const data = resp.data || {};
    return {
      ...data,
      start_time_readable: data.start_time ? formatReadable(data.start_time) : null,
      end_time_readable: data.end_time ? formatReadable(data.end_time) : null,
    };
  } catch (err) {
    const msg = err?.response?.data?.detail || err.message || "NLP parse failed";
    throw new Error(msg);
  }
}