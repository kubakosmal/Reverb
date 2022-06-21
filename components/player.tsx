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
import { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import { formatTime } from '../lib/formatters'
import { useDispatch } from 'react-redux'
import { changeActiveSong } from '../lib/playlistSlice'
import { PlayerProps } from '../types/components'

const Player = ({ songs, activeSong }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  )
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(isRepeat)
  const dispatch = useDispatch()

  useEffect(() => {
    let timerId: number
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    repeatRef.current = isRepeat
  }, [isRepeat])

  const setPlayState = (value: boolean) => {
    setIsPlaying(value)
  }

  const setShuffleState = (value: boolean) => {
    if (value) {
      setIsShuffle((val) => !val)
      setIsRepeat(false)
    } else {
      setIsShuffle((val) => !val)
    }
  }

  const setRepeatState = (value: boolean) => {
    if (value) {
      setIsRepeat((val) => !val)
      setIsShuffle(false)
    } else {
      setIsRepeat((val) => !val)
    }
  }

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e: any) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  const nextSong = () => {
    setIndex((state: any) => {
      if (isShuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          return nextSong()
        }
        return next
      } else {
        return state !== songs.length - 1 ? state + 1 : 0
      }
    })
  }

  useEffect(() => {
    dispatch(changeActiveSong(songs[index]))
  }, [index, songs])

  useEffect(() => {
    setIsPlaying(true)
  }, [activeSong])

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={isPlaying}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            icon={<MdShuffle />}
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={isShuffle ? 'white' : 'gray.600'}
            onClick={() => setShuffleState(!isShuffle)}
          />
          <IconButton
            icon={<MdSkipPrevious />}
            variant="link"
            aria-label="skip"
            fontSize="24px"
            onClick={prevSong}
          />
          {isPlaying ? (
            <IconButton
              icon={<MdOutlinePauseCircleFilled />}
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              icon={<MdOutlinePlayCircleFilled />}
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            icon={<MdSkipNext />}
            variant="link"
            aria-label="next"
            fontSize="24px"
            onClick={nextSong}
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            onClick={() => setRepeatState(!isRepeat)}
            color={isRepeat ? 'white' : 'gray.600'}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="5%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="90%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="white" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="5%">
            <Text fontSize="xs" textAlign="right">
              {formatTime(duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
