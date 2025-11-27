import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="w-72 bg-gray-50 min-h-screen border-r">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-semibold">Hoang's Planner</h1>
        </div>

        <nav className="space-y-1">
          <Link href="/" className="block p-2 rounded hover:bg-gray-100">
            Inbox
          </Link>
          <Link href="/today" className="block p-2 rounded hover:bg-gray-100">
            Today
          </Link>
          <Link href="/upcoming" className="block p-2 rounded hover:bg-gray-100">
            Upcoming
          </Link>
          <Link href="/filters" className="block p-2 rounded hover:bg-gray-100">
            Filters & Labels
          </Link>
          <Link href="/completed" className="block p-2 rounded hover:bg-gray-100">
            Completed
          </Link>
        </nav>

        <div className="mt-6">
          <h3 className="text-sm text-gray-500 mb-2">My Projects</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/projects/1"
                className="block p-2 rounded hover:bg-gray-100"
              >
                # Getting Started
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-xs text-gray-500">© Planner</div>
      </div>
    </aside>
  );
}
