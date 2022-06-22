import { Flex, Box, List, ListItem } from '@chakra-ui/layout'
import {
  Input,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { useState, useRef, useEffect } from 'react'
import fetcher from '../lib/fetcher'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { useDisclosure } from '@chakra-ui/react'
import { PlaylistDropdownProps } from '../types/components'
import { Playlist } from '../types/data'

export default function PlaylistDropdown({ playlist }: PlaylistDropdownProps) {
  const playlistId = playlist.id
  const [dropdown, setDropdown] = useState(false)
  const dropdownBox = useRef(null)
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const handleDelete = async () => {
    const res = await fetcher(`/playlist`, 'DELETE', {
      playlistId: playlistId,
    })
    mutate('/playlist')
    router.push(window.location.origin)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownBox.current && !dropdownBox.current.contains(e.target)) {
      setDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Flex marginBottom="30px" ref={dropdownBox}>
      <Box position="relative">
        <IconButton
          aria-label="toggle-dropdown"
          icon={<BsThreeDots />}
          bg="transparent"
          colorScheme="white"
          size="lg"
          sx={{
            '&:hover': {
              bgColor: 'transparent',
            },
            '&:focus': {
              boxShadow: 'none',
            },
          }}
          onClick={() => setDropdown((val) => !val)}
        >
          <BsThreeDots color="gray" fontSize="30px"></BsThreeDots>
        </IconButton>
        <Box
          position="absolute"
          hidden={!dropdown}
          bgColor="black.1000"
          color="white"
          left="15px"
          borderRadius="5px"
          boxShadow="2xl"
          padding="3px"
          width="150px"
        >
          <List>
            <ListItem fontSize="15px">
              <Box
                borderRadius="3px"
                paddingY="10px"
                paddingX="10px"
                sx={{
                  '&:hover': {
                    bgColor: 'gray.800',
                  },
                }}
                onClick={handleDelete}
                cursor="pointer"
              >
                Delete
              </Box>
            </ListItem>
            <ListItem fontSize="15px">
              <Box
                cursor="pointer"
                borderRadius="3px"
                paddingY="10px"
                paddingX="10px"
                sx={{
                  '&:hover': {
                    bgColor: 'gray.800',
                  },
                }}
              >
                <EditModal playlist={playlist}></EditModal>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Flex>
  )
}

const EditModal = ({ playlist }: { playlist: Playlist }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState(playlist.name)
  const [description, setDescription] = useState('')
  const { mutate } = useSWRConfig()
  const router = useRouter()

  useEffect(() => {
    setName(playlist.name)
    setDescription('')
  }, [isOpen])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetcher('/playlist', 'PATCH', {
      playlistId: playlist.id,
      newName: name,
      newDescription: description,
    })

    if (res) {
      mutate('/playlist')
      onClose()
      router.replace(router.asPath)
    }
  }

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
      >
        Edit
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="500px" bg="gray.900" color="white" boxShadow="2xl">
          <Box paddingY="10px" paddingX="5px">
            <ModalHeader fontSize="2xl" fontWeight="bold">
              Edit details
            </ModalHeader>
            <ModalCloseButton
              sx={{
                '&:focus': {
                  boxShadow: 'none',
                },
              }}
            />
            <ModalBody>
              <Flex>
                <Image
                  boxShadow="2xl"
                  width="170px"
                  height="170px"
                  src={playlist.image}
                ></Image>
                <Flex
                  flexDirection="column"
                  width="100%"
                  marginLeft="20px"
                  gap="15px"
                >
                  <Input
                    width="100%"
                    value={name}
                    type="text"
                    border="none"
                    bg="gray.800"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    height="115px"
                    placeholder="Description"
                    border="none"
                    bg="gray.800"
                    size="sm"
                    resize="none"
                    borderRadius="5px"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    width="100px"
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    type="submit"
                    colorScheme="gray"
                    onClick={handleSubmit}
                    marginBottom="15px"
                    color="black"
                    borderRadius="50px"
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
