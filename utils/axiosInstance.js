import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/apis",
});

// attach token on startup (client only)
if (typeof window !== "undefined") {
  const token = localStorage.getItem("access_token");
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("access_token");
    if (t) config.headers = { ...config.headers, Authorization: `Bearer ${t}` };
  }
  return config;
});

// redirect to login on 401 (clear token)
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        if (api?.defaults?.headers?.common) delete api.defaults.headers.common["Authorization"];
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;