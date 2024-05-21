import Head from 'next/head'
import { Inter } from 'next/font/google'


import { _Main } from '@/_views/ScheduleComponents/Main'
import Layout from '@/_views/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <Layout title='Главная'>
      <_Main />
    </Layout>
  )
}
