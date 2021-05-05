import React, { useEffect, useMemo, useRef, useState } from 'react'

import styles from './styles.module.scss'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import LogoImg from '../Svgs/Logo'
import moment from 'moment'
import Hamburger from '../Hamburger'
const Header: React.FC = () => {
    const { date } = useMemo(() => {
        const date = format(new Date(), 'EEEEE, d MMMM', {
            locale: ptBr
        })
        return { date }
    }, [])
    const [time, setTime] = useState('00:00:00')

    const titleRef = useRef<HTMLHeadingElement>(null)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpenMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        setInterval(() => {
            setTime(moment().locale('pt-br').format('LTS'))
        }, 1000)

        const textToInsert = 'O melhor para você ouvir, sempre'.split('')
        textToInsert.forEach((letter, i) => {
            setTimeout(() => {
                titleRef.current.innerHTML += letter
            }, 75 * i)
        })
    }, [])

    return (
        <header className={styles.container}>
            <LogoImg />
            <span>|</span>
            <h2 ref={titleRef} className={styles.title}></h2>
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
