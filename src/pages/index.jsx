import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const routes = useRouter()

  return (
    <>
      <main className="">
        <div className='p-card p-2 m-8 text-center select-none' onClick={() => routes.push("/enterPlayersName")}>
            <h2>Jouer</h2>
        </div>
        <div className='p-card p-2 m-8 text-center select-none'>
          <h2>Scores</h2>
        </div>
      </main>
    </>
  )
}
