import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/main.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <a href="/users">ユーザー一覧</a>
    </>
  )
}
