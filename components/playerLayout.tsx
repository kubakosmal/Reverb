import { Box } from '@chakra-ui/layout'
import Sidebar from './sidebar'
import PlayerBar from './playerBar'
import { ReactNode } from 'react'

const PlayerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="240px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="240px" marginBottom="90px">
        <Box height="calc(100vh - 90px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar></PlayerBar>
      </Box>
    </Box>
  )
}

export default PlayerLayout
