import { Box, List, Divider, Text } from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'
import { SidebarItem } from './sidebarItem'
import { Playlist } from '../types/data'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/api/newplaylist',
    action: 'createPlaylist',
  },
  /*   {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  }, */
]

const Sidebar = () => {
  const { playlists } = usePlaylist()

  if (!playlists) {
    return null
  }

  return (
    <Box
      width="100%"
      height="calc(100vh - 90px)"
      bg="black"
      paddingX="5px"
      color="gray.500"
    >
      <Box paddingY="20px" height="100%">
        <Box marginBottom="20px" paddingX="20px">
          <Text fontSize="3xl" color="white" fontWeight="semibold">
            Reverb
          </Text>
        </Box>
        <Box marginBottom="20px">
          <List spacing={3}>
            {navMenu.map((menuItem) => (
              <SidebarItem
                bold={true}
                withIcon={true}
                key={menuItem.name}
                item={menuItem}
              />
            ))}
          </List>
        </Box>
        <Box marginTop="20px" marginBottom="10px">
          <List spacing={3}>
            {musicMenu.map((menuItem) => (
              <SidebarItem
                bold={true}
                withIcon={true}
                key={menuItem.name}
                item={menuItem}
              />
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
            {playlists?.map((playlist: Playlist) => {
              playlist.route = `/playlist/${playlist.id}`
              return (
                <SidebarItem bold={false} withIcon={false} item={playlist} />
              )
            })}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
