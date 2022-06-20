import { getProviders, signIn } from 'next-auth/react'
import { Box, Center, Text, Divider } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import fetcher from '../lib/fetcher'
import { GetServerSideProps } from 'next'
import { Providers, Provider } from '../types/data'

const iconSize = '20px'

const providersItem = {
  github: {
    icon: <AiFillGithub fontSize={iconSize} />,
    bgColor: 'black',
  },
  facebook: {
    icon: <AiFillFacebook fontSize={iconSize} />,
    bgColor: '#4267B2',
  },
  discord: {
    icon: <FaDiscord fontSize={iconSize} />,
    bgColor: '#5865F2',
  },
}

export default function SignIn({ providers }: Providers) {
  console.log(providers)
  const handleClick = async () => {
    const user = await fetcher('/guest', 'GET')
    if (user) {
      signIn('credentials', {
        callbackUrl: window.location.origin,
        id: user.id,
      })
    }
  }
  return (
    <Box bgColor="black.1000" width="100vw" height="100vh">
      <Box
        padding="25px"
        color="white"
        fontSize="5xl"
        borderBottom="2px solid"
        borderColor="whiteAlpha.200"
        textAlign="center"
        fontWeight="semibold"
      >
        Reverb
      </Box>
      <Center marginY="35px">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color="white"
          fontWeight="semibold"
          width="450px"
        >
          <Text>To continue, log in to Reverb.</Text>
          <Box
            display="flex"
            flexDirection="column"
            marginY="20px"
            rowGap="15px"
            width="100%"
          >
            {Object.values(providers).map((provider: Provider) => {
              if (provider.id != 'credentials') {
                return (
                  <Button
                    paddingY="22px"
                    bgColor={
                      providersItem[provider.id as keyof typeof providersItem]
                        .bgColor
                    }
                    borderRadius="50px"
                    onClick={() => {
                      signIn(provider.id, {
                        callbackUrl: window.location.origin,
                      })
                    }}
                    colorScheme="green"
                    border="2px solid"
                    borderColor="whiteAlpha.300"
                  >
                    <Box display="flex" columnGap="10px" alignItems="center">
                      {
                        providersItem[provider.id as keyof typeof providersItem]
                          .icon
                      }
                      <Text>CONTINUE WITH {provider.name.toUpperCase()}</Text>
                    </Box>
                  </Button>
                )
              }
            })}
          </Box>
          <Box
            marginY="20px"
            display="flex"
            width="100%"
            alignItems="center"
            columnGap="15px"
          >
            <Box width="100%" bgColor="whiteAlpha.300" height="2px"></Box>
            <Text fontSize="sm">OR</Text>
            <Box width="100%" bgColor="whiteAlpha.300" height="2px"></Box>
          </Box>

          <Box display="flex" flexDirection="column" maxWidth="100%">
            <Text fontSize="4xl" fontWeight="bold" color="green.1000">
              Continue as guest
            </Text>

            <Text marginY="10px" fontSize="large">
              Changes you make will be saved in the database, but they will be
              lost after you sign out.
            </Text>
            <Button
              marginY="20px"
              boxShadow="3xl"
              alignSelf="flex-end"
              color="black"
              paddingY="22px"
              bgColor="green.1000"
              borderRadius="50px"
              width="100%"
              onClick={handleClick}
              border="2px solid"
              borderColor="whiteAlpha.300"
            >
              GUEST SESSION
            </Button>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}

SignIn.authPage = true

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
