import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import UserDropdown from './userDropdown'
import { GradientLayoutProps } from '../types/components'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: GradientLayoutProps) => {
  return (
    <Box
      position="relative"
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.600 0%, ${color}.700 5%, ${color}.800 10%, rgba(0,0,0,0.95) 70%)`}
    >
      <UserDropdown />
      <Box>
        <Flex
          bgGradient={`linear(to top, ${color}.800, ${color}.600)`}
          padding="20px"
          align="end"
        >
          <Box padding="20px">
            <Image
              boxSize="225px"
              boxShadow="dark-lg"
              src={image}
              borderRadius={roundImage ? '100%' : '3px'}
              fit="cover"
            />
          </Box>
          <Box padding="20px" lineHeight="55px" color="white">
            <Text fontSize="sm" fontWeight="bold" casing="uppercase">
              {subtitle}
            </Text>
            <Text dropShadow="2xl" fontSize="7xl" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm">{description}</Text>
          </Box>
        </Flex>
      </Box>

      <Box paddingY="20px" paddingX="20px">
        {children}
      </Box>
    </Box>
  )
}

export default GradientLayout
