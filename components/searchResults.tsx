import { Box, Text, Flex } from '@chakra-ui/layout'
import Card from './card'
import { useState, useEffect } from 'react'
import { SearchResultsProps } from '../types/components'
import { useSession } from 'next-auth/react'
import { SongCard } from './songCard'

export default function SearchResults({
  query,
  artists,
  songs,
  playlists,
}: SearchResultsProps) {
  const { data: session } = useSession()
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

  if (!session) {
    return <Box>loading</Box>
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="column"
      rowGap="20px"
      columnGap="5%"
      padding="20px"
    >
      {matchingSongs.length > 0 ? (
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            Songs
          </Text>
          <Flex marginY="15px" flexWrap="nowrap" gap="20px">
            {matchingSongs?.map((song, i) =>
              i < 6 ? (
                <SongCard
                  key={song.id}
                  type="song"
                  subtext={song.artist.name}
                  song={song}
                />
              ) : null
            )}
          </Flex>
        </Box>
      ) : null}
      {matchingArtists.length > 0 ? (
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            Artists
          </Text>
          <Flex marginY="15px" flexWrap="wrap" gap="20px">
            {matchingArtists?.map((artist) => (
              <Card
                key={artist.id}
                type="artist"
                subtext="Artist"
                item={artist}
              />
            ))}
          </Flex>
        </Box>
      ) : null}

      {matchingPlaylists.length > 0 ? (
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            Playlists
          </Text>
          <Flex marginY="15px" flexWrap="wrap" gap="20px">
            {matchingPlaylists?.map((playlist) => (
              <Card
                key={playlist.id}
                type="playlist"
                subtext={`by ${playlist.user.name}`}
                item={playlist}
              />
            ))}
          </Flex>
        </Box>
      ) : null}
    </Box>
  )
}
