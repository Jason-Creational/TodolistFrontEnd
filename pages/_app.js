import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from "next/router";
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { getToken } from "../apis/auth";
import { ToastProvider, useToast } from "../components/ToastContext";
import api from "../utils/axiosInstance";

function NotificationsPoller() {
  const showToast = useToast();
  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const resp = await api.get("/notifications"); // backend endpoint to return unsent notifs
        if (!mounted) return;
        resp.data.forEach(n => showToast(n.message, "success"));
      } catch(e) {
        // ignore
      }
    }
    poll();
    const id = setInterval(poll, 60_000);
    return () => { mounted = false; clearInterval(id); };
  }, [showToast]);
  return null;
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const publicPaths = ["/login", "/signup"];
  const hideLayout = publicPaths.includes(router.pathname);

  useEffect(() => {
    const checkAuth = (urlPath = router.pathname) => {
      const token = getToken();
      if (!token && !publicPaths.includes(urlPath)) {
        router.push("/login");
      }
    };

    // initial check
    checkAuth();

    const handleRouteChange = (url) => {
      try {
        const path = new URL(url, window.location.origin).pathname;
        checkAuth(path);
      } catch {
        checkAuth(url);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  if (hideLayout) {
    return (
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
      <NotificationsPoller />
    </ToastProvider>
  )
}
