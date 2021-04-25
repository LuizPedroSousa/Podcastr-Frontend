import convertDurationToTimeString from './convertDurationToTimeString'
export default function convertCurrentTimeToTimeString(currentTime: number) {
  const time = Math.floor(currentTime)
  let timeAsString = convertDurationToTimeString(time)
  if (time < 3600) {
    timeAsString = timeAsString.substr(3, 5)
  }

  return { time, timeAsString }
}
