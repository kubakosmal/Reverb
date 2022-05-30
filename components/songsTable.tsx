import { Box, Flex, Text } from '@chakra-ui/layout'
import {
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
  Image,
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate, formatTime } from '../lib/formatters'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveSong, changeActiveSongs } from '../lib/playlistSlice'

const SongTable = ({ songs }) => {
  const activeSong = useSelector((state: any) => state.playlist.activeSong)
  const dispatch = useDispatch()

  const handlePlay = (activeSong?) => {
    dispatch(changeActiveSong(activeSong || songs[0]))
    dispatch(changeActiveSongs(songs))
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th width="10px">#</Th>
              <Th paddingX="0">Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: 'all .3s ',
                  '&:hover': {
                    bg: 'rgba(255,255,255, 0.1)',
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td verticalAlign="middle">{i + 1}</Td>
                <Td paddingX="0" verticalAlign="middle">
                  <Flex gap="10px">
                    <Image
                      boxSize="40px"
                      boxShadow="2xl"
                      src={`https://picsum.photos/400?random=${song.id}`}
                      fit="cover"
                    />
                    <Flex direction="column">
                      <Text
                        color={
                          activeSong?.id == song.id ? 'green.300' : 'white'
                        }
                      >
                        {song.name}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {song.artist.name}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td verticalAlign="middle">{formatDate(song.createdAt)}</Td>
                <Td verticalAlign="middle">{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
