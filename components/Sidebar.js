import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProjects } from "../apis/projects";

export default function Sidebar() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchProjects();
        if (mounted && Array.isArray(res)) setProjects(res);
      } catch (err) {
        console.error("Failed to load projects for sidebar:", err);
        // keep projects empty — UI will show fallback/example
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const navLinkClass = (path) =>
    `block p-2 rounded hover:bg-gray-100 ${router.pathname === path ? "bg-gray-100 font-semibold" : ""}`;

  return (
    <aside className="w-72 bg-gray-50 min-h-screen border-r">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img src="/assets/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-lg font-semibold">Hoang's Planner</h1>
        </div>

        <nav className="space-y-1">
          <Link href="/" className={navLinkClass("/")}>Inbox</Link>
          <Link href="/today" className={navLinkClass("/today")}>Today</Link>
          <Link href="/upcoming" className={navLinkClass("/upcoming")}>Upcoming</Link>
          <Link href="/filters" className={navLinkClass("/filters")}>Filters & Labels</Link>
          <Link href="/completed" className={navLinkClass("/completed")}>Completed</Link>
        </nav>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-500">My Projects</h3>
          </div>

          <ul className="space-y-1">
            {loading && <li className="text-sm text-gray-500">Loading…</li>}
            {!loading &&
              projects.map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}`} className={navLinkClass(`/projects/${p.id}`)}>
                    {p.name || `# Project ${p.id}`}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-6 text-xs text-gray-500">© Planner</div>
      </div>
    </aside>
  );
}
