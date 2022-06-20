import { Box, Text, Flex } from '@chakra-ui/layout'
import ArtistCard from './artistCard'
import { useState, useEffect } from 'react'
import { SearchResultsProps } from '../types/components'

export default function SearchResults({
  query,
  artists,
  songs,
  playlists,
}: SearchResultsProps) {
  const [matchingArtists, setMatchingArtists] = useState([])
  const [matchingSongs, setMatchingSongs] = useState([])
  const [matchingPlaylists, setMatchingPlaylists] = useState([])

  useEffect(() => {
    setMatchingArtists(
      artists.filter((artist) =>
        artist.name.toLowerCase().includes(query.toLowerCase())
      )
    )
    setMatchingSongs(
      songs.filter((song) =>
        song.name.toLowerCase().includes(query.toLowerCase())
      )
    )
    setMatchingPlaylists(
      playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query])
  return (
    <Box padding="20px">
      {matchingArtists.length > 0 ? (
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            Artists
          </Text>
          <Flex marginY="15px" flexWrap="wrap" gap="20px">
            {matchingArtists?.map((artist) => (
              <ArtistCard artist={artist} />
            ))}
          </Flex>
        </Box>
      ) : null}
    </Box>
  )
}
