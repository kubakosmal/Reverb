import { Box, Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'

export default function LoadingScreen() {
  return (
    <Box
      height="100%"
      width="100%"
      bgGradient="linear(to-br, gray.800, black.1000)"
    >
      <Center height="100%">
        <Spinner
          speed="1.2s"
          color="gray.800"
          opacity="0.3"
          emptyColor="black.1000"
          thickness="30px"
          sx={{ width: '250px', height: '250px' }}
        />
      </Center>
    </Box>
  )
}
