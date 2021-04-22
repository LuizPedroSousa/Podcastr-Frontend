import React from 'react'

import styles from './styles.module.scss'

interface DescriptionProps {
  description: string
}
const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div
      className={styles.episodeDescription}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
}
export default Description
