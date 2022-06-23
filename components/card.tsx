import { Box, Text, LinkBox } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { CardProps } from '../types/components'

export default function Card({ item, subtext, type }: CardProps) {
  return (
    <LinkBox key={item.id}>
      <NextLink href={`/${type}/${item.id}`}>
        <Box
          minWidth="125px"
          maxWidth="175px"
          dropShadow="dark-xl"
          cursor="pointer"
          key={item.id}
        >
          <Box
            boxShadow="lg"
            bg="gray.900"
            borderRadius="7px"
            padding="15px"
            paddingBottom={type === 'artist' ? '25px' : '15px'}
            width="100%"
            transition="all .25s"
            sx={{
              '&:hover': {
                bg: 'blackAlpha.700',
              },
            }}
          >
            <Image
              src={item.image}
              borderRadius={type === 'artist' ? '100%' : '3px'}
              boxShadow="dark-lg"
            />
            <Box marginTop="20px">
              <Text fontSize="large" noOfLines={1} fontWeight="bold">
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {subtext}
              </Text>
            </Box>
          </Box>
        </Box>
      </NextLink>
    </LinkBox>
  )
}
