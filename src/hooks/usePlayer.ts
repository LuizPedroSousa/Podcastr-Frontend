import { useContext } from 'react'
import PlayerContext from 'src/context/Player/context'

export default function usePlayer() {
  return useContext(PlayerContext)
}
