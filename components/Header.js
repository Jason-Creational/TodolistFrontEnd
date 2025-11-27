import { useRouter } from "next/router";
import { logoutUser } from "../apis/auth";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="text-xl font-semibold">
        {/* Page title could be enhanced */} Planner
      </div>
      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1 text-sm"
          onClick={() => router.push("/projects")}
        >
          Projects
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-50 text-red-600 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
