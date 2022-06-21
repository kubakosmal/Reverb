import { Button, Flex, Box, Text, List, ListItem } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default () => {
  const [dropdown, setDropdown] = useState(false)
  const { data: session, status } = useSession()
  const button = useRef(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (button.current && !button.current.contains(e.target)) {
      setDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (status != 'authenticated') {
    return null
  }
  let user = session.user

  return (
    <>
      <Button
        zIndex={5}
        borderRadius="50px"
        position="absolute"
        top="20px"
        right="20px"
        paddingRight="15px"
        height="34px"
        paddingLeft="2px"
        paddingY="0"
        bgColor="rgba(0,0,0,0.6)"
        color="white"
        fontSize="sm"
        cursor="pointer"
        fontWeight="bold"
        sx={{
          '&:hover': {
            bgColor: 'black',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        }}
        onClick={() => setDropdown((val) => !val)}
      >
        <Flex align="center" padding="0px">
          <Box marginRight="10px">
            <Image
              borderRadius="100%"
              height="30px"
              width="30px"
              src={user.image}
              fit="cover"
            ></Image>
          </Box>

          <Text>{user.name}</Text>
          <MdArrowDropDown fontSize="20px"></MdArrowDropDown>
        </Flex>
      </Button>
      <Box
        position="absolute"
        hidden={!dropdown}
        width="200px"
        right="20px"
        top="65px"
        padding="3px"
        color="white"
        bgColor="black.1000"
        borderRadius="5px"
        boxShadow="xl"
      >
        <List>
          <ListItem fontSize="15px">
            <Box
              ref={button}
              borderRadius="3px"
              paddingY="10px"
              paddingX="10px"
              sx={{
                '&:hover': {
                  bgColor: 'gray.800',
                },
              }}
              onClick={() =>
                signOut({ callbackUrl: `${window.location.origin}` })
              }
              cursor="pointer"
            >
              Sign out
            </Box>
          </ListItem>
        </List>
      </Box>
    </>
  )
}
