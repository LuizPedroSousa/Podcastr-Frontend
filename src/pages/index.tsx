import React, { useMemo } from 'react'
import Head from 'next/head'
import styles from '../styles/pages/home.module.scss'
import { GetStaticProps } from 'next'
import api from 'src/services/api'
import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import convertDurationToTimeString from 'src/utils/convertDurationToTimeString'
import LastEpisodes from 'src/Components/perPage/Home/LastEpisodes'
import AllEpisodes from 'src/Components/perPage/Home/AllEpisodes'
interface Episode {
    id: string
    title: string
    members: string
    publishedAt: string
    thumbnail: string
    durationAsString: string
    url: string
    duration: number
}

interface HomeProps {
    lastEpisodes: Array<Episode>
    allEpisodes: Array<Episode>
}
export default function Home({ lastEpisodes, allEpisodes }: HomeProps) {
  const episodeList = useMemo(() => [...lastEpisodes, ...allEpisodes], [])

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Podcastr | Home</title>
        <meta
          name="description"
          content="Uma plataforma para desenvolvedores escutarem os melhores podcasts"
        />
        <meta
          name="image"
          content="https://github.com/LuizPedroSousa/Podcastr-Frontend/blob/main/public/images/home-thumbnail.png?raw=true"
        />
        <meta
          property="og:image"
          content="https://github.com/LuizPedroSousa/Podcastr-Frontend/blob/main/public/images/home-thumbnail.png?raw=true"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Podcastr | Home" />
        <meta property="og:title" content="Plataforma | Podcastr" />
        <meta property="og:description" content="Uma plataforma para desenvolvedores escutarem os melhores podcasts"/>
        <meta name="twitter:title" content="Plataforma | Podcastr" />
        <meta
          name="twitter:image"
          content="https://github.com/LuizPedroSousa/Podcastr-Frontend/blob/main/public/images/home-thumbnail.png?raw=true"
        />
        <meta
          name="twitter:image:src"
          content="https://github.com/LuizPedroSousa/Podcastr-Frontend/blob/main/public/images/home-thumbnail.png?raw=true"
        />

      </Head>
      <LastEpisodes
        episodeList={episodeList}
        lastEpisodes={lastEpisodes}
      />
      <AllEpisodes episodeList={episodeList} allEpisodes={allEpisodes} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _sort: 'published_at',
      _limit: 12,
      _order: 'desc'
    }
  })
  const episodes = data.map(({ published_at, file, ...rest }) => {
    return {
      ...rest,
      publishedAt: format(parseISO(published_at), 'd MMM yy', {
        locale: ptBR
      }),
      ...file,
      durationAsString: convertDurationToTimeString(Number(file.duration))
    }
  })

  const lastEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      lastEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 5
  }
}
