const base = '/api/nlp'
function authHeaders() { const token = (typeof window !== 'undefined' && window.__AUTH_TOKEN) || null; return token ? { 'Authorization': `Bearer ${token}` } : {} }
export async function parseDateFromText(text) {
  const res = await fetch(base, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    throw new Error('NLP parse failed')
  }
  return res.json()
}