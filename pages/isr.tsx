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

export async function getStaticProps() {
  const { data: tasks } = await supabase.from('todos').select()
  // .order('created_at', { ascending: true })
  const { data: notices } = await supabase.from('notices').select()
  console.log('tasks', tasks)
  console.log('notices', notices)
  return {
    props: { tasks, notices },
    revalidate: 10,
  }
}

export default function Isr({ tasks, notices }: SsgProps) {
  const router = useRouter()
  return (
    <Layout title="ISR">
      <p className="mb-3 text-xl font-extrabold text-indigo-500">
        -------- ISR ---------
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
      <Link href="/ssr" className="my-3 text-xs" prefetch={false}>
        Link to ssr
      </Link>
      <Link href="/csr" className="my-3 text-xs" prefetch={false}>
        Link to csr
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Button to ssr
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('/csr')}>
        Button to csr
      </button>
    </Layout>
  )
}
