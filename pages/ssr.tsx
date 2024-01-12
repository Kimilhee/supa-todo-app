import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import Link from 'next/link'

type Task = {
  id: number
  title: string
}

type Notice = {
  id: number
  content: string
}

type SsgProps = {
  tasks: Task[]
  notices: Notice[]
}

export async function getServerSideProps() {
  const { data: tasks } = await supabase.from('todos').select()
  // .order('created_at', { ascending: true })
  const { data: notices } = await supabase.from('notices').select()
  console.log('tasks', tasks)
  console.log('notices', notices)
  return {
    props: { tasks, notices },
  }
}

export default function Ssr({ tasks, notices }: SsgProps) {
  const router = useRouter()
  return (
    <Layout title="SSR">
      <p className="mb-3 text-xl font-extrabold text-blue-500">
        =========== SSR ===========
      </p>
      <ul className="mb-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-bold">{task.title}</p>
          </li>
        ))}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => (
          <li key={notice.id}>
            <p className="text-lg font-bold">{notice.content}</p>
          </li>
        ))}
      </ul>
      <Link href="/ssg" className="my-3 text-xs" prefetch={false}>
        Link to ssg
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Button to ssg
      </button>
    </Layout>
  )
}
