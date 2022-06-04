import {
  Box,
  List,
  ListItem,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { useRef, useEffect, useState } from 'react'
import { MdOutlineArrowRight } from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'
import fetcher from '../lib/fetcher'
import { useSWRConfig } from 'swr'

export default function SongDropdown({ songId }) {
  const [dropdown, setDropdown] = useState(false)
  const [playlistDropdown, setPlaylistDropdown] = useState(false)
  const { playlists } = usePlaylist()
  const box = useRef(null)
  const playlistDiv = useRef(null)
  const { mutate } = useSWRConfig()

  const handleClick = (e) => {
    e.stopPropagation()
    setDropdown((val) => !val)
  }

  const handleClickOutside = (e) => {
    if (box.current && !box.current.contains(e.target)) {
      setDropdown(false)
      setPlaylistDropdown(false)
    }
  }

  const handleMouseOutside = (e) => {
    if (playlistDiv.current && !playlistDiv.current.contains(e.target)) {
      setPlaylistDropdown(false)
    } else {
      setPlaylistDropdown(true)
    }
  }

  const handlePlaylistClick = async (playlistId) => {
    const res = await fetcher('/playlist', 'PUT', {
      playlistId: playlistId,
      songId: songId,
    })
    console.log(res)
    mutate('/playlist')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    playlistDiv.current.addEventListener('mouseover', handleMouseOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      /* playlistDiv.current.removeEventListener('mouseover', handleMouseOutside) */
    }
  }, [])

  return (
    <Box position="relative" ref={box} fontWeight="bold">
      <IconButton
        icon={<BsThreeDots fontSize="25px" />}
        aria-label="toggle-dropdown"
        colorScheme="white"
        size="sm"
        onClick={handleClick}
        sx={{
          '&:focus': {
            boxShadow: 'none',
          },
        }}
      ></IconButton>
      <Box
        position="absolute"
        hidden={!dropdown}
        bgColor="gray.900"
        color="white"
        left="-140px"
        borderRadius="5px"
        boxShadow="2xl"
        padding="3px"
        width="170px"
      >
        <List>
          <ListItem fontSize="13px">
            <Flex
              position="relative"
              ref={playlistDiv}
              justify="space-between"
              align="center"
              borderRadius="3px"
              paddingY="5px"
              paddingX="10px"
              sx={{
                '&:hover': {
                  bgColor: 'gray.800',
                },
              }}
            >
              <Text>Add to playlist</Text>
              <MdOutlineArrowRight fontSize="20px" />
              <Box
                borderRadius="3px"
                boxShadow="3xl"
                width="170px"
                bgColor="gray.900"
                left="-170px"
                position="absolute"
                hidden={!playlistDropdown}
                padding="3px"
              >
                <List>
                  {playlists.map((playlist) => (
                    <ListItem
                      borderRadius="5px"
                      paddingY="5px"
                      paddingX="10px"
                      sx={{
                        '&:hover': {
                          bgColor: 'gray.800',
                        },
                      }}
                      onClick={() => handlePlaylistClick(playlist.id)}
                    >
                      {playlist.name}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Flex>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}
