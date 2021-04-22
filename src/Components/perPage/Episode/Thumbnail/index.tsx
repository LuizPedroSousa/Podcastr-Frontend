import Image from 'next/image'
import React from 'react'

import ArrowLeft from '../../../../../public/arrow-left.svg'
import Play from '../../../../../public/play.svg'
import styles from './styles.module.scss'

interface Episode {
  title: string
  thumbnail: string
}
interface ThumbnailProps {
  episode: Episode
}
const Thumbnail: React.FC<ThumbnailProps> = ({
  episode: { title, thumbnail }
}) => {
  return (
    <div className={styles.thumbnailOverlay}>
      <div className={styles.thumbnailContainer}>
        <button type="button" className={styles.buttonBack}>
          <ArrowLeft />
        </button>
        <Image
          width={700}
          height={160}
          objectFit="cover"
          src={thumbnail}
          alt={title}
        />
        <button type="button" className={styles.buttonPlay}>
          <Play />
        </button>
      </div>
    </div>
  )
}

export default Thumbnail
