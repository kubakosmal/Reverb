import {
  ListItem,
  LinkOverlay,
  LinkBox,
  ListIcon,
  Flex,
} from '@chakra-ui/layout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import fetcher from '../lib/fetcher'
import { useSWRConfig } from 'swr'
import { SidebarItemProps } from '../types/components'

export const SidebarItem = ({ item, withIcon, bold }: SidebarItemProps) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const handleClick = async () => {
    const newPlaylist = await fetcher('/playlist', 'POST', {
      action: item.action,
    })

    if (newPlaylist) {
      mutate('/playlist')
      router.push(`${window.location.origin}/playlist/${newPlaylist.id}`)
    }
  }

  return (
    <>
      {item.action != 'createPlaylist' && (
        <ListItem
          paddingX="20px"
          fontSize="15px"
          transition="all 0.15s"
          fontWeight={bold ? 'bold' : 'normal'}
          sx={{
            '&:hover': {
              color: 'white',
            },
          }}
        >
          <LinkBox>
            <NextLink href={item.route} passHref>
              <LinkOverlay>
                <Flex align="center">
                  {withIcon && (
                    <ListIcon
                      fontSize="25px"
                      as={item.icon}
                      marginRight="15px"
                    />
                  )}
                  {item.name}
                </Flex>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      )}

      {item.action == 'createPlaylist' && (
        <ListItem
          paddingX="20px"
          fontSize="15px"
          fontWeight="bold"
          onClick={handleClick}
          cursor="pointer"
          transition="all 0.20s"
          sx={{
            '&:hover': {
              color: 'white',
            },
          }}
        >
          <ListIcon fontSize="25px" as={item.icon} marginRight="15px" />
          {item.name}
        </ListItem>
      )}
    </>
  )
}

export default SidebarItem
