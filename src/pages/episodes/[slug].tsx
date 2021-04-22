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
      </Head>
      <Thumbnail episode={episode} />
      <Header episode={episode} />
      <Description description={episode.description} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
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
