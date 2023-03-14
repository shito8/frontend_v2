import Head from 'next/head'
import MainPage from './MainPage'
import Image from 'next/image';




export default function Home() {


  return (
    <>
      <Head>
        <title>Wrapping | anetaBTC</title>
        <meta name="description" content="A protocol to unlock the value of Bitcoin on Ergo and Cardano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
	      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
	      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
	      <link rel="shortcut icon" href="/favicon.ico"/>
	      <link rel="manifest" href="/site.webmanifest"/>
	      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9BD9F2"/>
	      <meta name="msapplication-TileColor" content="#9bd9f2"/>
	      <meta name="theme-color" content="#ffffff"/>
        
      </Head>
      <main className='mainPage'>
        <MainPage />
      </main>
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
