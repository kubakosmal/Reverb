import { IconButton } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { changeActiveSong, changeActiveSongs } from '../lib/playlistSlice'

export default function PlayButton({ songs }) {
  const dispatch = useDispatch()
  const handlePlay = () => {
    dispatch(changeActiveSong(songs[0]))
    dispatch(changeActiveSongs(songs))
  }
  return (
    <IconButton
      icon={<BsFillPlayFill fontSize="30px" />}
      aria-label="play"
      colorScheme="green"
      size="lg"
      isRound
      onClick={() => handlePlay()}
    />
  )
}
