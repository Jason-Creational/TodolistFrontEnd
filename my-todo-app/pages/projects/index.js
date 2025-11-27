import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchProjects } from '../../apis/projects'
import ProjectModal from '../../components/ProjectModal'

export default function ProjectsPage(){
  const [projects, setProjects] = useState([])
  useEffect(()=>{ fetchProjects().then(setProjects) }, [])
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <ProjectModal onCreated={(p)=>setProjects(prev=>[p,...prev])} />
      </div>
      <ul className="space-y-2">
        {projects.map(p=> (
          <li key={p.id} className="p-3 bg-white rounded shadow">
            <Link href={`/projects/${p.id}`}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}