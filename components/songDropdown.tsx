import { Box, List, ListItem, Text, Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { useRef, useEffect, useState } from 'react'
import { MdOutlineArrowRight } from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'
import fetcher from '../lib/fetcher'
import { useSWRConfig } from 'swr'
import { Playlist } from '../types/data'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRouter } from 'next/router'

export default function SongDropdown({ songId }: { songId: number }) {
  const router = useRouter()
  const [dropdown, setDropdown] = useState(false)
  const [playlistDropdown, setPlaylistDropdown] = useState(false)
  const [dropdownDirection, setDropdownDirection] = useState('left')
  const { playlists } = usePlaylist()
  const box = useRef(null)
  const playlistDiv = useRef(null)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (box.current.offsetLeft < 200) {
      setDropdownDirection('right')
    }
  }, [box])

  const handleClick = (e: any) => {
    e.stopPropagation()
    setDropdown((val) => !val)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (box.current && !box.current.contains(e.target)) {
      setDropdown(false)
      setPlaylistDropdown(false)
    }
  }

  const handleMouseOutside = (e: MouseEvent) => {
    if (playlistDiv.current && !playlistDiv.current.contains(e.target)) {
      setPlaylistDropdown(false)
    } else {
      setPlaylistDropdown(true)
    }
  }

  const handlePlaylistClick = async (e: any, playlistId: number) => {
    e.stopPropagation()
    setDropdown(false)
    const res = await fetcher('/playlist', 'PUT', {
      playlistId: playlistId,
      songId: songId,
    })

    if (res) {
      mutate('/playlist')
    }
  }

  const handleNewPlaylist = async (e: any) => {
    e.stopPropagation()
    const newPlaylist = await fetcher('/playlist', 'POST')

    if (newPlaylist) {
      mutate('/playlist')
      router.push(`${window.location.origin}/playlist/${newPlaylist.id}`)
    }
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
                zIndex={10}
                borderRadius="3px"
                boxShadow="3xl"
                width="170px"
                bgColor="gray.900"
                left={dropdownDirection === 'left' ? '-165px' : '165px'}
                position="absolute"
                hidden={!playlistDropdown}
                padding="3px"
              >
                <List>
                  {playlists.map((playlist: Playlist) => (
                    <ListItem
                      key={playlist.id}
                      borderRadius="5px"
                      paddingY="5px"
                      paddingX="10px"
                      sx={{
                        '&:hover': {
                          bgColor: 'gray.800',
                        },
                      }}
                      onClick={(e) => handlePlaylistClick(e, playlist.id)}
                    >
                      {playlist.name}
                    </ListItem>
                  ))}
                  <ListItem
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="5px"
                    paddingY="5px"
                    paddingX="10px"
                    sx={{
                      '&:hover': {
                        bgColor: 'gray.800',
                      },
                    }}
                    onClick={handleNewPlaylist}
                  >
                    <Text>Create New</Text>
                    <Box justifySelf="flex-end">
                      <AiOutlinePlus />
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Flex>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}
