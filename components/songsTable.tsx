import { Box, Flex, Text } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate, formatTime } from '../lib/formatters'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveSong, changeActiveSongs } from '../lib/playlistSlice'
import SongDropdown from './songDropdown'
import { Song } from '../types/data'

const SongTable = ({ songs }: { songs: Song[] }) => {
  const activeSong = useSelector((state: any) => state.playlist.activeSong)
  const dispatch = useDispatch()

  const handlePlay = (activeSong: Song) => {
    dispatch(changeActiveSong(activeSong))
    dispatch(changeActiveSongs(songs))
  }

  return (
    <Table variant="unstyled">
      <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
        <Tr>
          <Th width="1%">#</Th>
          <Th paddingX="0">Title</Th>
          <Th>Date Added</Th>
          <Th width="20px">
            <AiOutlineClockCircle />
          </Th>
          <Th width="10px"></Th>
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
                  src={song.image}
                  fit="cover"
                />
                <Flex direction="column">
                  <Text
                    color={activeSong?.id == song.id ? 'green.300' : 'white'}
                  >
                    {song.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    onClick={(e) => e.preventDefault()}
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline',
                        color: 'white',
                      },
                    }}
                  >
                    <NextLink href={`/artist/${song.artist.id}`}>
                      <a>{song.artist.name}</a>
                    </NextLink>
                  </Text>
                </Flex>
              </Flex>
            </Td>
            <Td verticalAlign="middle">{formatDate(song.createdAt)}</Td>
            <Td verticalAlign="middle">{formatTime(song.duration)}</Td>
            <Td verticalAlign="middle">
              <SongDropdown songId={song.id} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default SongTable
