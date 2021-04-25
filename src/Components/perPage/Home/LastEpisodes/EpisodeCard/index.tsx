import React from 'react'
import PlayGreen from '../../../../../../public/play-green.svg'
import PauseGreen from '../../../../../../public/pause-green.svg'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import usePlayer from 'src/hooks/usePlayer'

interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  url: string
  duration: number
  thumbnail: string
  durationAsString: string
}

interface EpisodeCardProps {
  episode: Episode
  episodeList: Array<Episode>
  index: number
}
const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  episodeList,
  index
}) => {
  const { currentEpisode, currentTime, isPlaying, playList } = usePlayer()
  return (
    <li className={styles.episodeCard}>
      <Image
        width={192}
        height={192}
        objectFit="cover"
        src={episode.thumbnail}
        alt={episode.title}
      />
      <div className={styles.episodeDetails}>
        <Link href={`/episodes/${episode.id}`}>
          <a>{episode.title}</a>
        </Link>
        <p>{episode.members}</p>
        <span>{episode.publishedAt}</span>
        <span>
          {currentEpisode?.id === episode.id
            ? currentTime.timeAsString
            : episode.durationAsString}
        </span>
      </div>
      <button aria-label={`tocar ${episode.title}`} type="button" onClick={() => playList(episodeList, index)}>
        {currentEpisode?.id === episode.id && isPlaying ? (
          <PauseGreen />
        ) : (
          <PlayGreen />
        )}
      </button>
    </li>
  )
}

export default EpisodeCard
