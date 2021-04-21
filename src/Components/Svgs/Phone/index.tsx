import React from 'react'

import styles from './styles.module.scss'

const Phone: React.FC = () => {
  return (
    <svg
      width="29"
      height="22"
      viewBox="0 0 29 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id={styles.container}>
        <g id={styles.zap}>
          <path
            d="M19.0411 14.7013H17.9571C17.6598 14.7013 17.3878 14.8693 17.2558 15.1347L16.2545 17.1373C16.1105 17.4267 15.6971 17.4267 15.5531 17.1373L13.1038 12.2373C12.9611 11.9533 12.5585 11.9467 12.4078 12.2267L11.2931 14.2893C11.1558 14.5427 10.8905 14.7013 10.6025 14.7013H9.62512"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id={styles.flat}>
          <path
            d="M4.89175 11.6667H3.66775C1.95842 11.6667 0.690418 13.2533 1.06642 14.92L1.96908 18.92C2.24375 20.136 3.32375 21 4.57042 21H6.16508C6.59308 21 6.90908 20.604 6.81575 20.1867L5.09308 12.5587C3.75575 6.63467 8.25975 1 14.3331 1V1V1C20.4064 1 24.9104 6.63467 23.5731 12.5587L21.8518 20.1867C21.7571 20.604 22.0744 21 22.5011 21H24.0958C25.3424 21 26.4224 20.136 26.6971 18.92L27.5998 14.92C27.9758 13.2533 26.7078 11.6667 24.9984 11.6667H23.7744"
            stroke="#04D361"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}

export default Phone
