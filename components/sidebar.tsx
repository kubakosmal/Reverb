import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { useMe, usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
    active: true,
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
    active: false,
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
    active: false,
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
    active: false,
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
    active: false,
  },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box
      width="100%"
      height="calc(100vh - 90px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Text fontSize="2xl" color="white">
            Reverb
          </Text>
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink
                    href={menu.active ? menu.route : '/playlist/1'}
                    passHref
                  >
                    <LinkOverlay color={menu.active ? 'gray.500' : 'gray.700'}>
                      <ListIcon
                        as={menu.icon}
                        color={menu.active ? 'white' : 'gray.800'}
                        marginRight="20px"
                      />

                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop="20px" marginBottom="10px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href="/playlist/1" passHref>
                    <LinkOverlay color={menu.active ? 'gray.500' : 'gray.700'}>
                      <ListIcon
                        as={menu.icon}
                        color={menu.active ? 'white' : 'gray.800'}
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#555555',
              borderRadius: '24px',
            },
          }}
        >
          <List spacing={2}>
            {playlists?.map((playlist) => (
              <ListItem paddingX="20px" key={playlist.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
