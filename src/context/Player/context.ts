import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction
} from 'react'

export interface Episode {
  id: string
  title: string
  members: string
  url: string
  durationAsString: string
  duration: number
  thumbnail: string
}

export interface CurrentTime {
  time: number
  timeAsString: string
}

interface PlayerContextProps {
  playList: (list: Array<Episode>, index: number) => void
  play: (episode: Episode) => void
  togglePlay: () => void
  playNext: () => void
  playPrevious: () => void
  toggleLooping: () => void
  toggleShuffle: () => void
  clearPlayer: () => void
  setCurrentTime: Dispatch<SetStateAction<CurrentTime>>
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  hasNext: boolean
  hasPrevious: boolean
  currentEpisodeIndex: number
  currentEpisode: Episode
  currentTime: CurrentTime
  episodeList: Array<Episode>
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  audioRef: MutableRefObject<HTMLAudioElement>
}

const PlayerContext = createContext({} as PlayerContextProps)

export default PlayerContext
