import api from "../utils/axiosInstance";

export const signupUser = async (payload) => {
  const resp = await api.post("/auth/signup", payload);
  const token = resp.data?.access_token || resp.data?.token;
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("access_token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return resp.data;
};

export const loginUser = async ({ email, password }) => {
  const resp = await api.post("/auth/login", { email, password });
  const token = resp.data?.access_token || resp.data?.token;
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("access_token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return resp.data;
};

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    if (api?.defaults?.headers?.common) {
      delete api.defaults.headers.common["Authorization"];
    }
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const isAuthenticated = () => !!getToken();
