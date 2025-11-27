import { useState } from 'react'
import { useRouter } from 'next/router'
import { signupUser } from '../apis/auth'

export default function SignupPage(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    try {
      await signupUser({ email, password })
      router.push('/login')
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
        <button className="w-full py-2 bg-green-600 text-white rounded">Sign up</button>
      </form>
    </div>
  )
}