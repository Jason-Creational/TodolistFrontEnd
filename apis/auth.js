const base = '/api/auth'
export async function loginUser({ email, password }) {
  const res = await fetch(`${base}/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Login failed')
  const data = await res.json()
  if (typeof window !== 'undefined') {
    window.__AUTH_TOKEN = data.token
    localStorage.setItem('auth_token', data.token)
  }
  return data
}

export async function signupUser(payload) {
  const res = await fetch(`${base}/signup`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

export async function logoutUser() {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        window.__AUTH_TOKEN = null
      }
    return { ok: true }
}
