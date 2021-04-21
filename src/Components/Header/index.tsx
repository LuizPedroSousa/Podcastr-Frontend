import React, { useEffect, useMemo, useState } from 'react'

import styles from './styles.module.scss'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import LogoImg from '../Svgs/Logo'
import Hamburger from '../Hamburger'
const Header: React.FC = () => {
  const { date, title } = useMemo(() => {
    const date = format(new Date(), 'EEEEE, d MMMM', {
      locale: ptBr
    })
    const title = 'O melhor para você ouvir, sempre'.split('')
    return { date, title }
  }, [])
  const [time, setTime] = useState('00:00:00')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setInterval(() => {
      setTime('')
    }, 1000)
  }, [])

  return (
    <header className={styles.container}>
      <LogoImg />
      <span>|</span>
      <h2>
        {title.map((letter, index) => (
          <span
            className={styles[`title_${letter === ' ' ? 'white' : index}`]}
            key={`${letter}_${index}`}
          >
            {letter}
          </span>
        ))}
      </h2>
      <Hamburger onClick={handleOpenMenu} />
      {isMenuOpen && (
        <ul className={styles.menuOptions}>
          <li>{`${date} ás ${time}`}</li>
        </ul>
      )}

      <p>{`${date} ás ${time}`}</p>
    </header>
  )
}

export default Header
