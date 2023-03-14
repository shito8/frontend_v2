import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/layouts/Navbar'
import Menu from '@/layouts/Menu'
import Kya from '@/layouts/Kya'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='mainPage'>
        <Navbar/>
        <Menu />
        <Kya />
      </div>
      <Component {...pageProps} />
    </>
  )
}
