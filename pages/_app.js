import '../styles/globals.css'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { getTokenFromStorage } from '../lib/auth'


export default function MyApp({ Component, pageProps }) {
  // Example: attach auth token to global fetch if present (simple approach)
  useEffect(() => {
    const token = getTokenFromStorage()
    if (token) {
      // you can set default headers in a wrapper or use fetch wrapper
      // example: window.__AUTH_TOKEN = token
      window.__AUTH_TOKEN = token
    }
  }, [])


  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}
