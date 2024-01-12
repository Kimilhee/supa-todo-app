import Head from 'next/head'
import { ReactNode } from 'react'
import { BadgeCheckIcon } from '@heroicons/react/outline'

type Title = {
  title: string
  children: ReactNode
}

export function Layout({ children, title = 'To do' }: Title) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>{title}</Head>
      <header></header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t">
        <BadgeCheckIcon className="h-6 w-6 text-blue-500"></BadgeCheckIcon>
      </footer>
    </div>
  )
}
