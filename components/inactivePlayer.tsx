import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'

export default function InactivePlayer() {
  return (
    <Box>
      <Box></Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            icon={<MdShuffle />}
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color="gray.600"
            cursor="default"
          />
          <IconButton
            icon={<MdSkipPrevious />}
            variant="link"
            aria-label="skip"
            fontSize="24px"
            cursor="default"
          />

          <IconButton
            icon={<MdOutlinePauseCircleFilled />}
            variant="link"
            aria-label="pause"
            fontSize="40px"
            color="gray.600"
            cursor="default"
          />

          <IconButton
            icon={<MdSkipNext />}
            variant="link"
            aria-label="next"
            fontSize="24px"
            cursor="default"
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color="gray.600"
            cursor="default"
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="5%">
            <Text fontSize="xs">0:00</Text>
          </Box>
          <Box width="90%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={100}
              id="player-range"
              cursor="default"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="transparent" />
              </RangeSliderTrack>
              <RangeSliderThumb
                cursor="default"
                bg="transparent"
                index={0}
                sx={{
                  '&:focus': {
                    outline: 'none',
                    boxShadow: 'none !important',
                  },
                }}
              />
            </RangeSlider>
          </Box>
          <Box width="5%">
            <Text fontSize="xs" textAlign="right">
              0:00
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
