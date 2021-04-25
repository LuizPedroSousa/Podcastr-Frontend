import React, { useEffect, useMemo, useRef, useState } from 'react'
import convertCurrentTimeToTimeString from 'src/utils/convertCurrentTimeToTimeString'

import PlayerContext, { CurrentTime, Episode } from './context'
const { Provider } = PlayerContext

const PlayerProvider: React.FC = ({ children }): JSX.Element => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    time: 0,
    timeAsString: '00:00'
  })
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentEpisode = useMemo(() => {
    return episodeList[currentEpisodeIndex]
  }, [isPlaying, currentEpisodeIndex])

  const { hasNext, hasPrevious } = useMemo(() => {
    const hasPrevious = !(currentEpisodeIndex - 1 === -1)
    const hasNext = isShuffling || !(currentEpisodeIndex + 1 >= episodeList.length)

    return { hasNext, hasPrevious }
  }, [currentEpisode])

  useEffect(() => {
    if (currentEpisode) {
      audioRef.current?.addEventListener('timeupdate', () => {
        const { time, timeAsString } = convertCurrentTimeToTimeString(audioRef.current?.currentTime)
        setCurrentTime({ time, timeAsString })
      })
    }
  }, [currentEpisode])

  function play(episode: Episode): void | Promise<void> {
    if (episode === currentEpisode) {
      return togglePlay()
    }
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    return setIsPlaying(true)
  }

  function playList(list: Episode[], index: number): void {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    togglePlay()
  }

  function playNext(): void {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      return
    }
    if (!hasNext) {
      return
    }
    setCurrentEpisodeIndex(currentEpisodeIndex + 1)
  }

  function clearPlayer() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  function playPrevious(): void {
    if (!hasPrevious) {
      return
    }
    return setCurrentEpisodeIndex(currentEpisodeIndex - 1)
  }

  function togglePlay(): void | Promise<void> {
    if (isPlaying) {
      setIsPlaying(false)
      return audioRef.current?.pause()
    }
    setIsPlaying(true)
    return audioRef.current?.play()
  }

  const toggleLooping = () => setIsLooping(!isLooping)

  const toggleShuffle = () => setIsShuffling(!isShuffling)

  return (
    <Provider
      value={{
        setCurrentTime,
        toggleLooping,
        toggleShuffle,
        clearPlayer,
        playPrevious,
        togglePlay,
        playNext,
        setIsPlaying,
        playList,
        play,
        isLooping,
        hasNext,
        hasPrevious,
        currentTime,
        audioRef,
        isShuffling,

        isPlaying,
        currentEpisodeIndex,
        episodeList,
        currentEpisode
      }}
    >
      {children}
    </Provider>
  )
}

export default PlayerProvider
