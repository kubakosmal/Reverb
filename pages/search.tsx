import { Box, Flex } from '@chakra-ui/layout'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import UserDropdown from '../components/userDropdown'
import { MdSearch } from 'react-icons/md'
import SearchResults from '../components/searchResults'
import prisma from '../lib/prisma'
import { useState } from 'react'
import { SearchProps } from '../types/pages'

export const Search = ({ artists, songs, playlists }: SearchProps) => {
  const [value, setValue] = useState('')
  return (
    <Box
      overflowY="auto"
      bg="gray.800"
      width="calc(100vw - 240px)"
      height="calc(100vh - 90px)"
      color="white"
    >
      <Flex align="center" bg="gray.900" padding="20px">
        <UserDropdown />
        <InputGroup color="black">
          <InputLeftElement
            fontSize="3xl"
            pointerEvents="none"
            children={<MdSearch />}
          />
          <Input
            bg="white"
            borderRadius="50px"
            placeholder="Artsits, songs or playlists"
            minW="200px"
            maxW="350px"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Box>
        <SearchResults
          query={value}
          artists={artists}
          songs={songs}
          playlists={playlists}
        />
      </Box>
    </Box>
  )
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany()
  const songs = await prisma.song.findMany()
  const playlists = await prisma.playlist.findMany()

  return {
    props: JSON.parse(
      JSON.stringify({
        artists: artists,
        songs: songs,
        playlists: playlists,
      })
    ),
  }
}

export default Search
