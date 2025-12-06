import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../apis/auth";
import { useToast } from "../components/ToastContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      const token = result?.access_token || result?.token;
      if (token) {
        showToast("Logged in successfully", "success");
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || "Login error", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={e=>setPassword(e.target.value)} 
            className="w-full px-3 py-2 border rounded" 
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
      </p>
    </div>
  );
}
