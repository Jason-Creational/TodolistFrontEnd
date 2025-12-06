import api from "../utils/axiosInstance";

export async function fetchProjects() {
  try {
    const resp = await api.get("/projects");
    return resp.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) throw new Error("Unauthorized");
    throw new Error(err?.response?.data?.detail || err.message || "Failed to fetch projects");
  }
}

export async function createProject(payload) {
  try {
    const resp = await api.post("/projects", payload);
    return resp.data;
  } catch (err) {
    throw new Error(err?.response?.data?.detail || err.message || "Failed to create project");
  }
}

export async function fetchProject(id) {
  try {
    const resp = await api.get(`/projects/${id}`);
    return resp.data;
  } catch (err) {
    throw new Error(err?.response?.data?.detail || err.message || "Failed to fetch project");
  }
}

export const getProject = async (id) => {
  try {
    return await fetchProject(id);
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};