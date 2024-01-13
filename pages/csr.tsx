import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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

export default function Csr() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  const router = useRouter()

  useEffect(() => {
    async function getTasks() {
      const { data: tasks } = await supabase.from('todos').select()
      setTasks(tasks as Task[])
    }
    async function getNotices() {
      const { data: notices } = await supabase.from('notices').select()
      setNotices(notices as Notice[])
    }

    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title="SSG+CSR">
      <p className="mb-3 text-xl font-extrabold text-green-500">
        ****** SSG + CSR ******
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
      <Link href="/ssg" className="my-3 text-xs" prefetch={false}>
        Link to ssg
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Button to ssr
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Button to ssg
      </button>
    </Layout>
  )
}
