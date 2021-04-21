import React from 'react'
import PlayGreen from '../../../../../../public/play-green.svg'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  durationAsString: string
}

interface EpisodeCardProps {
  episode: Episode
}
const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode: { id, thumbnail, title, members, publishedAt, durationAsString }
}) => {
  return (
    <li className={styles.episodeCard}>
      <Image
        width={192}
        height={192}
        objectFit="cover"
        src={thumbnail}
        alt={title}
      />
      <div className={styles.episodeDetails}>
        <Link href={`/episodes/${id}`}>
          <a>{title}</a>
        </Link>
        <p>{members}</p>
        <span>{publishedAt}</span>
        <span>{durationAsString}</span>
      </div>
      <button type="button">
        <PlayGreen />
      </button>
    </li>
  )
}

export default EpisodeCard
