import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import api from 'src/services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import convertDurationToTimeString from 'src/utils/convertDurationToTimeString'
import styles from '../../styles/pages/episode.module.scss'
import Head from 'next/head'
import Thumbnail from 'src/Components/perPage/Episode/Thumbnail'
import Header from 'src/Components/perPage/Episode/Header'
import Description from 'src/Components/perPage/Episode/Description'
interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  description: string
  url: string
  duration: number
  durationAsString: string
}
interface EpisodesProps {
  episode: Episode
}
export default function Episodes({ episode }: EpisodesProps) {
  return (
    <div className={styles.episodePage}>
      <Head>
        <title>Podcastr | {episode.title}</title>
        <meta
          name="description"
          content={episode.description.replace('<p></p>', '')}
        />
        <meta
          name="image"
          content={episode.thumbnail}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          property="og:image"
          content={episode.thumbnail}
        />
        <meta property="og:image:alt" content={episode.title} />
        <meta property="og:title" content={episode.title} />
        <meta property="og:description" content={episode.description.replace('<p></p>', '')}/>
        <meta name="twitter:title" content={episode.title} />
        <meta
          name="twitter:image"
          content={episode.thumbnail}
        />
        <meta
          name="twitter:image:src"
          content={episode.thumbnail}
        />

      </Head>
      <Thumbnail episode={episode} />
      <Header episode={episode} />
      <Description description={episode.description} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _sort: 'published_at',
      _limit: 2,
      _order: 'desc'
    }
  })

  const paths = data.map(({ id }) => {
    return {
      params: {
        slug: id
      }
    }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { data } = await api.get(`/episodes/${slug}`)
  const episode = {
    ...data,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    ...data.file,
    durationAsString: convertDurationToTimeString(Number(data.file.duration))
  }
  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
