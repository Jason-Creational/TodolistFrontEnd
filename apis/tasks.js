import api from "../utils/axiosInstance";

export const getTasks = async (category, filter) => {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (filter) params.append("filter", filter);
    const res = await api.get(`/tasks?${params.toString()}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    throw new Error(err?.response?.data?.detail || err.message || "Failed to fetch tasks");
  }
};

export const getTask = async (id) => {
  try {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.detail || err.message || "Failed to fetch task");
  }
};

export const createTask = async (payload) => {
  try {
    const res = await api.post("/tasks", payload);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.detail || err.message || "Failed to create task");
  }
};

export const updateTask = async (taskId, patch) => {
  try {
    const res = await api.patch(`/tasks/${taskId}`, patch);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    throw new Error(err?.response?.data?.detail || err.message || "Failed to update task");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    throw new Error(err?.response?.data?.detail || err.message || "Failed to delete task");
  }
};

export const toggleTaskComplete = async (taskId, completed) => {
  return updateTask(taskId, { completed });
};