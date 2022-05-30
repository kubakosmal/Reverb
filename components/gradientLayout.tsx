import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 20%, rgba(0,0,0,0.95) 80%)`}
    >
      <Flex bg={`${color}.600`} padding="20px" align="end">
        <Box padding="20px">
          <Image
            boxSize="225px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
            fit="cover"
          />
        </Box>
        <Box padding="20px" lineHeight="45px" color="white">
          <Text fontSize="sm" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="7xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="20px" paddingX="20px">
        {children}
      </Box>
    </Box>
  )
}

export default GradientLayout
