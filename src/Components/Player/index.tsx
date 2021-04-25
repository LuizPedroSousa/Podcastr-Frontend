import React, { useMemo } from 'react'
import Phone from '../Svgs/Phone'

import Slider from 'rc-slider'

import PlayIcon from '../../../public/play.svg'
import ShuffleIcon from '../../../public/shuffle.svg'
import PlayPreviousIcon from '../../../public/play-previous.svg'
import PlayNextIcon from '../../../public/play-next.svg'
import RepeatIcon from '../../../public/repeat.svg'
import Image from 'next/image'
import PauseIcon from '../../../public/pause.svg'
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'
import usePlayer from 'src/hooks/usePlayer'
import convertCurrentTimeToTimeString from 'src/utils/convertCurrentTimeToTimeString'

interface ButtonsProps {
    className?: string
    Icon: any
    accessibility: {
        name: string
        'aria-label': string
    }
    disabled: boolean
    onClick?: () => void
}
const Player: React.FC = () => {
  const {
    togglePlay,
    toggleLooping,
    setIsPlaying,
    playPrevious,
    playNext,
    currentEpisode,
    isPlaying,
    audioRef,
    hasNext,
    hasPrevious,
    currentTime,
    episodeList,
    isShuffling,
    toggleShuffle,
    setCurrentTime,
    clearPlayer,
    isLooping
  } = usePlayer()

  const handleSeek = (amount: number) => {
    const newTime = audioRef.current.currentTime = amount
    const { time, timeAsString } = convertCurrentTimeToTimeString(newTime)
    setCurrentTime({ time, timeAsString })
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      return playNext()
    }
    clearPlayer()
  }

  const { buttons } = useMemo(() => {
    const buttons: ButtonsProps[] = [
      {
        Icon: ShuffleIcon,
        disabled: !currentEpisode || episodeList.length < 2,
        onClick: toggleShuffle,
        accessibility: {
          name: 'ordem aleatória',
          'aria-label': 'ordem aleatória'

        },
        className: isShuffling && 'isActive'
      },
      {
        Icon: PlayPreviousIcon,
        onClick: playPrevious,
        disabled: !currentEpisode || !hasPrevious,
        accessibility: {
          name: 'voltar',
          'aria-label': 'Voltar um episódio'
        }
      },
      {
        Icon: isPlaying ? PauseIcon : PlayIcon,
        onClick: togglePlay,
        className: 'playButton',
        disabled: !currentEpisode,
        accessibility: {
          name: isPlaying ? 'tocar' : 'pausar',
          'aria-label': isPlaying ? 'Retomar episódio atual' : 'Pausar episódio atual'
        }

      },
      {
        Icon: PlayNextIcon,
        onClick: playNext,
        disabled: !currentEpisode || !hasNext,
        accessibility: {
          name: 'avançar',
          'aria-label': 'Avançar um episódio'
        }
      },
      {
        Icon: RepeatIcon,
        onClick: toggleLooping,
        className: isLooping && 'isActive',
        disabled: !currentEpisode,
        accessibility: {
          name: 'repetir',
          'aria-label': 'Repetir episódio'
        }
      }
    ]

    return { buttons }
  }, [isShuffling, isLooping, isPlaying, currentEpisode])

  return (
    <aside className={styles.container}>
      <header className={styles.title}>
        <Phone />
        <strong>Tocando agora</strong>
      </header>

      {currentEpisode ? (
        <div className={styles.currentEpisode}>
          <Image
            height={800}
            width={700}
            objectFit="cover"
            src={currentEpisode.thumbnail}
            alt={currentEpisode.title}
          />
          <strong>{currentEpisode.title}</strong>
          <br />
          <span>{currentEpisode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyEpisode}>
          <strong>
            Selecione um <br /> podcast para ouvir
          </strong>
        </div>
      )}

      {currentEpisode && (
        <audio
          ref={audioRef}
          loop={isLooping}
          src={currentEpisode.url}
          autoPlay
          onEnded={handleEpisodeEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <footer className={!currentEpisode ? styles.emptyFooter : ''}>
        <div className={styles.progress}>
          <p>
            {!currentEpisode ? '00:00' : currentTime.timeAsString}
          </p>
          {!currentEpisode ? (
            <span></span>
          ) : (
            <Slider
              value={currentTime.time}
              min={0}
              onChange={handleSeek}
              max={currentEpisode.duration}
              trackStyle={{ backgroundColor: '#04D361' }}
              railStyle={{ backgroundColor: '#9F75FF' }}
              handleStyle={{
                borderColor: '#04D361',
                borderWidth: 4
              }}
            />
          )}
          <p>
            {!currentEpisode
              ? '00:00'
              : currentEpisode.durationAsString}
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          {buttons.map(
            ({ onClick, Icon, accessibility, className, disabled }, index) => (
              <button
                onClick={onClick}
                type="button"
                key={index}
                {...accessibility}
                disabled={disabled}
                className={className ? styles[className] : ''}
              >
                {<Icon />}
              </button>
            )
          )}
        </div>
      </footer>
    </aside>
  )
}

export default Player
