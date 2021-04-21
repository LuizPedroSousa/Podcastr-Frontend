import React from 'react'
import Header from 'src/Components/Header'
import PlayerProvider from 'src/context/Player/provider'
import Player from '../Components/Player'
import '../styles/global.scss'
import styles from '../styles/pages/app.module.scss'
function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  )
}

export default MyApp
