import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import Player from './player'
import { useSelector } from 'react-redux'
import InactivePlayer from './inactivePlayer'
import { motion } from 'framer-motion'

const PlayerBar = () => {
  const songs = useSelector((state: any) => state.playlist.activeSongs)
  const activeSong = useSelector((state: any) => state.playlist.activeSong)

  return (
    <Box height="90px" width="100vw" bg="gray.900" borderTop="1px solid">
      <Flex align="center" height="100%">
        <Box padding="20px" color="white" width="30%">
          {activeSong ? (
            <Flex gap="10px" align="center">
              <Box>
                <Image
                  boxSize="45px"
                  boxShadow="2xl"
                  src={activeSong.image}
                  fit="cover"
                />
              </Box>
              <Box>
                <Text fontSize="medium">{activeSong?.name}</Text>
                <Text fontSize="xs">{activeSong?.artist.name}</Text>
              </Box>
            </Flex>
          ) : null}
        </Box>

        <Box width="40%">
          {activeSong ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.25 }}
            >
              <Player songs={songs} activeSong={activeSong} />
            </motion.div>
          ) : (
            <InactivePlayer />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
