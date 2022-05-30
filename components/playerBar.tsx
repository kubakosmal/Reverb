import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
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
            <Box>
              <Text fontSize="large">{activeSong?.name}</Text>
              <Text fontSize="sm">{activeSong?.artist.name}</Text>
            </Box>
          ) : null}
        </Box>

        <Box width="40%">
          {activeSong ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 1 }}
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
