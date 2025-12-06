import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { logoutUser } from "../apis/auth";
import api from "../utils/axiosInstance";

export default function Header() {
  const router = useRouter();
  const [notifCount, setNotifCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  const initialized = useRef(false);
  const containerRef = useRef(null);

  const dismissTask = async (id) => {
    try {
      await api.post(`/notifications/tasks/${id}/dismiss`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setNotifCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error("Failed to dismiss reminder", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifsForSound = async () => {
      try {
        // keep existing behavior: fetch unread notifications (marks them read) for sound trigger
        const res = await api.get("/notifications");
        const count = Array.isArray(res.data) ? res.data.length : 0;
        if (!initialized.current) {
          initialized.current = true;
        } else if (count > 0) {
          try {
            await audioRef.current?.play();
          } catch (err) {
            console.debug("notification sound play failed", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch notifications for sound", err);
      }
    };

    const fetchRemindedTasks = async () => {
      try {
        const r = await api.get("/notifications/tasks?limit=5");
        const list = Array.isArray(r.data) ? r.data : [];
        if (mounted) {
          setTasks(list);
          setNotifCount(list.length);
        }
      } catch (err) {
        console.error("Failed to fetch reminded tasks", err);
      }
    };

    // run both initially
    fetchNotifsForSound();
    fetchRemindedTasks();

    const id = setInterval(() => {
      fetchNotifsForSound();
      fetchRemindedTasks();
    }, 15000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

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
      <audio ref={audioRef} preload="auto">
        <source src="/jingle.mp3" type="audio/mpeg" />
      </audio>

      <div className="text-xl font-semibold">Planner</div>

      <div className="relative flex items-center gap-4" ref={containerRef}>
        <div className="ml-4 flex items-center gap-3">
          <button
            type="button"
            className="relative"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <img src="/assets/bell.png" alt="Notifications" className="w-6 h-6 object-contain" />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {notifCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-6 top-16 w-80 bg-white border rounded shadow-lg z-50" style={{ maxHeight: "60vh" }}>
              <div className="p-2 border-b font-medium">Recent reminders</div>
              <div className="overflow-auto" style={{ maxHeight: "48vh" }}>
                {tasks.length === 0 && (
                  <div className="p-3 text-sm text-gray-600">No recent reminders</div>
                )}
                {tasks.map((t) => (
                  <div key={t.id} className="p-3 border-b hover:bg-gray-50 flex items-start justify-between">
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{t.title || "Untitled"}</div>
                      <div className="text-xs text-gray-500">
                        {t.remind_at ? new Date(t.remind_at).toLocaleString() : t.date ? new Date(t.date).toLocaleString() : ""}
                      </div>
                      {t.description && <div className="text-sm text-gray-700 mt-1">{t.description}</div>}
                    </div>
                    <button
                      onClick={() => dismissTask(t.id)}
                      className="ml-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
                      aria-label="Dismiss reminder"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="px-3 py-1 text-sm" onClick={() => router.push("/projects")}>
          Projects
        </button>
        <button onClick={handleLogout} className="px-3 py-1 bg-red-50 text-red-600 rounded">
          Logout
        </button>
      </div>
    </header>
  );
}
