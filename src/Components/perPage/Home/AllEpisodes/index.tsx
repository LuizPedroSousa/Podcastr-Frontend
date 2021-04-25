import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import PlayGreen from '../../../../../public/play-green.svg'
import Link from 'next/link'
import PauseGreen from '../../../../../public/pause-green.svg'
import usePlayer from 'src/hooks/usePlayer'
interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  duration: number
  url: string
  durationAsString: string
}

interface AllEpisodesProps {
  allEpisodes: Array<Episode>
  episodeList: Array<Episode>
}
const AllEpisodes: React.FC<AllEpisodesProps> = ({
  allEpisodes,
  episodeList
}) => {
  const {
    playList,
    isPlaying,
    currentEpisode,
    currentTime: { timeAsString }
  } = usePlayer()

  return (
    <section className={styles.allEpisodesContainer}>
      <h2>Todos os episódios</h2>
      <div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td className={styles.episodeImage}>
                  <Image
                    width={120}
                    height={120}
                    objectFit="cover"
                    src={episode.thumbnail}
                    alt={episode.title}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td className={styles.episodeDate}>{episode.publishedAt}</td>
                <td>
                  {currentEpisode?.id === episode.id
                    ? timeAsString
                    : episode.durationAsString}
                </td>
                <td>
                  <button
                    type="button"
                    aria-label={`tocar ${episode.title}`}
                    onClick={() => playList(episodeList, index + 2)}
                  >
                    {currentEpisode?.id === episode.id && isPlaying ? (
                      <PauseGreen />
                    ) : (
                      <PlayGreen />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllEpisodes
