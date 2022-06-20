import { Box, Text, LinkBox } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Artist } from '../types/data'

export default function artistCard({ artist }: { artist: Artist }) {
  return (
    <LinkBox key={artist.id}>
      <NextLink href={`/artist/${artist.id}`}>
        <Box width="175px" cursor="pointer" key={artist.id}>
          <Box
            bg="gray.900"
            borderRadius="7px"
            padding="15px"
            paddingBottom="25px"
            width="100%"
            transition="all .25s"
            sx={{
              '&:hover': {
                bg: 'gray.800',
              },
            }}
          >
            <Image src={artist.image} borderRadius="100%" boxShadow="dark-lg" />
            <Box marginTop="20px">
              <Text fontSize="large" fontWeight="bold">
                {artist.name}
              </Text>
              <Text fontSize="sm" color="gray.400">
                Artist
              </Text>
            </Box>
          </Box>
        </Box>
      </NextLink>
    </LinkBox>
  )
}
