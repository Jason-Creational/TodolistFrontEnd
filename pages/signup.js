import { useState } from "react";
import { useRouter } from "next/router";
import { signupUser } from "../apis/auth";
import { useToast } from "../components/ToastContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser({ email, password, name });
      const token = res?.access_token || res?.token;
      if (token) {
        showToast("Signed up successfully", "success");
        router.push("/");
      } else {
        showToast("Signup succeeded but no token returned", "error");
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || "Signup error", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
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
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">
          Sign up
        </button>
      </form>
    </div>
  );
}