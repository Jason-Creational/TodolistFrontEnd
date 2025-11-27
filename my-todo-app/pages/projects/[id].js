import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList';
import TaskInput from '../../components/TaskInput';
import { getProject } from '../../apis/projects'; // Corrected import
import { getTasks } from '../../apis/tasks'; // Corrected import

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!id) return;
    getProject(id).then(setProject); // Corrected function
    getTasks(`project:${id}`).then(setTasks); // Corrected function
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project?.name || 'Project'}</h1>
      <TaskInput defaultProjectId={id} onAdded={(t) => setTasks((prev) => [t, ...prev])} />
      <TaskList tasks={tasks} />
    </div>
  );
}