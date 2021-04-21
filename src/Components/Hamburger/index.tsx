import React, { useState } from 'react'

import styles from './styles.module.scss'

interface HamburgerProps {
  onClick: () => void
}
const Hamburger: React.FC<HamburgerProps> = ({ onClick }) => {
  const [lines, setLines] = useState({
    firstLine: 'beforeFirstLine',
    secondLine: 'beforeSecondLine',
    thirdLine: 'beforeThirdLine'
  })
  const handleClickHamburger = () => {
    setLines({
      firstLine: 'afterFirstLine',
      secondLine: 'afterSecondLine',
      thirdLine: 'afterThirdLine'
    })
    return onClick()
  }
  return (
    <button
      type="button"
      className={styles.burgerButton}
      onClick={handleClickHamburger}
    >
      <svg
        width="41"
        height="25"
        viewBox="0 0 41 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g id={styles[lines.firstLine]}>
            <rect x="15" y="21" width="26" height="4" rx="2" fill="#494C4B" />
          </g>
          <g id={styles[lines.secondLine]}>
            <rect y="10" width="41" height="4" rx="2" fill="#494C4B" />
          </g>
          <g id={styles[lines.thirdLine]}>
            <rect x="5" width="36" height="4" rx="2" fill="#494C4B" />
          </g>
        </g>
      </svg>
    </button>
  )
}

export default Hamburger
