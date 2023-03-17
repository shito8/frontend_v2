import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/layouts/Navbar'
import Menu from '@/layouts/Menu'
import Kya from '@/layouts/Kya'
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='mainPage'>
        <Navbar/>
        <Menu />
        <Kya />
        <Component {...pageProps} />
      </div>
      <div className="mobile">
        <Image src='/img/logo_dark.png' className="mobLogo" alt="aneta" width={180} height={37}/>
          <div className="textMob">
            <h2>The anetaBTC bridge is not yet available on mobile devices.</h2>
          </div>
          <div className="infoMob">
            <h3>The Moonshine BTC wallet is required for wrapping BTC and is only available as a mobile wallet. Moonshine wallet can be downloaded below.</h3>
          </div>

          <div className="buttonMob">
            <a target="_blank" href="https://moonshinewallet.com/">Get Moonshine BTC wallet</a>
          </div>

          <div>
            <Image src='/img/back_mob.png' className="mobBack" alt="aneta" width={400} height={470}/>
          </div>
                
      </div>
    </>
  )
}
