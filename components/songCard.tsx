import { Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { SongCardProps } from '../types/components'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveSong, changeActiveSongs } from '../lib/playlistSlice'
import SongDropdown from './songDropdown'
import { Song } from '../types/data'

export const SongCard = ({ song, subtext, type }: SongCardProps) => {
  const currentActiveSong = useSelector(
    (state: any) => state.playlist.activeSong
  )
  const dispatch = useDispatch()

  const handlePlay = (activeSong: Song) => {
    dispatch(changeActiveSong(activeSong))
    dispatch(changeActiveSongs([activeSong]))
  }

  return (
    <Box
      minWidth="100px"
      maxWidth="255px"
      boxShadow="lg"
      cursor="pointer"
      key={song.id}
      onClick={() => handlePlay(song)}
    >
      <Box
        bg={song == currentActiveSong ? 'blackAlpha.700' : 'whiteAlpha.100'}
        borderRadius="7px"
        display="flex"
        flexDirection="column"
        padding="7px"
        paddingBottom="0px"
        width="100%"
        transition="all .25s"
        sx={{
          '&:hover': {
            bg: 'blackAlpha.700',
          },
        }}
      >
        <Image
          src={song.image}
          borderRadius={type === 'artist' ? '100%' : '3px 3px 0px 0px'}
          boxShadow="dark-lg"
        />
        <Box marginTop="20px">
          <Text fontSize="sm" noOfLines={1} fontWeight="bold">
            {song.name}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {subtext}
          </Text>
        </Box>
        <Box justifySelf="flex-end" alignSelf="end">
          <SongDropdown songId={song.id} />
        </Box>
      </Box>
    </Box>
  )
}
