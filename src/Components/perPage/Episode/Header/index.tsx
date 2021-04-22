import React from 'react'

import styles from './styles.module.scss'

interface Episode {
  title: string
  members: string
  publishedAt: string
  durationAsString: string
}
interface HeaderProps {
  episode: Episode
}
const Header: React.FC<HeaderProps> = ({
  episode: { title, members, publishedAt, durationAsString }
}) => {
  return (
    <header className={styles.episodeHeader}>
      <h2>{title}</h2>
      <span>{members}</span>
      <span>{publishedAt}</span>
      <span>{durationAsString}</span>
    </header>
  )
}

export default Header
