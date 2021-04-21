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
}
interface LastEpisodesProps {
  lastEpisodes: Array<Episode>
}
const LastEpisodes: React.FC<LastEpisodesProps> = ({ lastEpisodes }) => {
  return (
    <section className={styles.lastEpisodesContainer}>
      <h2>Ultimos lançamentos</h2>
      <ul>
        {lastEpisodes.map(episode => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </ul>
    </section>
  )
}

export default LastEpisodes
