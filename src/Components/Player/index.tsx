import React, { useMemo } from 'react'
import Phone from '../Svgs/Phone'

import styles from './styles.module.scss'

import PlayIcon from '../../../public/play.svg'
import ShuffleIcon from '../../../public/shuffle.svg'
import PlayPreviousIcon from '../../../public/play-previous.svg'
import PlayNextIcon from '../../../public/play-next.svg'
import RepeatIcon from '../../../public/repeat.svg'
interface ButtonsProps {
  className?: string
  Icon: any
}
const Player: React.FC = () => {
  const { buttons } = useMemo(() => {
    const buttons: ButtonsProps[] = [
      { Icon: ShuffleIcon },
      { Icon: PlayPreviousIcon },
      { Icon: PlayIcon, className: 'playButton' },
      { Icon: PlayNextIcon },
      { Icon: RepeatIcon }
    ]
    return { buttons }
  }, [])
  return (
    <aside className={styles.container}>
      <header className={styles.title}>
        <Phone />
        <strong>Tocando agora</strong>
      </header>
      <div className={styles.selectMusic}>
        <strong>
          Selecione um <br /> podcast para ouvir
        </strong>
      </div>
      <footer className={styles.empty}>
        <div className={styles.emptyProgress}>
          <p>00:00</p>
          <span></span>
          <p>00:00</p>
        </div>
        <div className={styles.buttonsContainer}>
          {buttons.map(({ Icon, className }, index) => (
            <button type="button" key={index} className={styles[className]}>
              {<Icon />}
            </button>
          ))}
        </div>
      </footer>
    </aside>
  )
}

export default Player
