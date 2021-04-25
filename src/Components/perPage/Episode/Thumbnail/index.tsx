import Image from 'next/image'
import React from 'react'

import ArrowLeft from '../../../../../public/arrow-left.svg'
import Play from '../../../../../public/play.svg'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import Pause from '../../../../../public/pause.svg'
import usePlayer from 'src/hooks/usePlayer'
interface Episode {
  id: string
  title: string
  thumbnail: string
  url: string
  duration: number
  members: string
  durationAsString: string
}
interface ThumbnailProps {
  episode: Episode
}
const Thumbnail: React.FC<ThumbnailProps> = ({ episode }) => {
  const { play, currentEpisode, isPlaying } = usePlayer()

  function handlePlay() {
    return play(episode)
  }
  const Router = useRouter()
  const handleGoBack = () => Router.back()
  return (
    <div className={styles.thumbnailOverlay}>
      <div className={styles.thumbnailContainer}>
        <button
          type="button"
          onClick={handleGoBack}
          className={styles.buttonBack}
        >
          <ArrowLeft />
        </button>
        <Image
          width={700}
          height={160}
          objectFit="cover"
          src={episode.thumbnail}
          alt={episode.title}
        />
        <button
          type="button"
          onClick={handlePlay}
          className={styles.buttonPlay}
        >
          {currentEpisode?.id === episode.id && isPlaying ? (
            <Pause />
          ) : (
            <Play />
          )}
        </button>
      </div>
    </div>
  )
}

export default Thumbnail
