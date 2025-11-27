const base = "/api/projects";
function authHeaders() {
  const token = (typeof window !== "undefined" && window.__AUTH_TOKEN) || null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function fetchProjects() {
  const res = await fetch(base, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function createProject(payload) {
  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
export async function fetchProject(id) {
  const res = await fetch(`${base}/${id}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export const getProject = async (id) => {
  try {
    const res = await axios.get(`/projects/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};
