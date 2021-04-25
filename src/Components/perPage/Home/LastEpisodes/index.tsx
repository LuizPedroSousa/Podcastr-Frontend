import React from 'react'
import EpisodeCard from './EpisodeCard'

import styles from './styles.module.scss'
interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  durationAsString: string
  duration: number
  url: string
}
interface LastEpisodesProps {
  lastEpisodes: Array<Episode>
  episodeList: Array<Episode>
}
const LastEpisodes: React.FC<LastEpisodesProps> = ({
  lastEpisodes,
  episodeList
}) => {
  return (
    <section className={styles.lastEpisodesContainer}>
      <h2>Ultimos lançamentos</h2>
      <ul>
        {lastEpisodes.map((episode, index) => (
          <EpisodeCard
            key={episode.id}
            episodeList={episodeList}
            index={index}
            episode={episode}
          />
        ))}
      </ul>
    </section>
  )
}

export default LastEpisodes
