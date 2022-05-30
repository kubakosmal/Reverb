import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'
import { useState } from 'react'
import NextImage from 'next/image'

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 2px solid"
      >
        <Text fontSize="5xl" color="white">
          Reverb
        </Text>
      </Flex>
      <Flex direction="column" align="center" height="calc(100vh - 100px)">
        <Box marginTop="50px" fontSize="large">
          <Box>
            <Text as="span" fontWeight="bold">
              Login:{' '}
            </Text>
            <Text as="span">user@test.com</Text>
          </Box>
          <Box>
            <Text as="span" fontWeight="bold">
              Password:{' '}
            </Text>
            <Text as="span">password</Text>
          </Box>
        </Box>
        <Box
          padding="50px"
          /* border="1px solid white" */
          bg="black"
          borderRadius="6px"
        >
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginY="5px"
              bg="gray.900"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginY="5px"
              bg="gray.900"
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{ '&:hover': { bg: 'green.300' } }}
              marginY="5px"
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
