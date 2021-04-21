import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import PlayGreen from '../../../../../public/play-green.svg'
import Link from 'next/link'

interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  durationAsString: string
}

interface AllEpisodesProps {
  allEpisodes: Array<Episode>
}
const AllEpisodes: React.FC<AllEpisodesProps> = ({ allEpisodes }) => {
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
            {allEpisodes.map(
              ({
                id,
                thumbnail,
                title,
                members,
                publishedAt,
                durationAsString
              }) => (
                <tr key={id}>
                  <td className={styles.episodeImage}>
                    <Image
                      width={120}
                      height={120}
                      objectFit="cover"
                      src={thumbnail}
                      alt={title}
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${id}`}>
                      <a>{title}</a>
                    </Link>
                  </td>
                  <td>{members}</td>
                  <td className={styles.episodeDate}>{publishedAt}</td>
                  <td>{durationAsString}</td>
                  <td>
                    <button type="button">
                      <PlayGreen />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllEpisodes
