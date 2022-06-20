import formatDuration from 'format-duration'

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000)
}

export const formatDate = (dateString: any) => {
  const parsedDateString = dateString.slice(0, 10).split('-')
  const date = new Date(
    parsedDateString[0],
    parsedDateString[1],
    parsedDateString[2]
  )
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
