import prisma from './prisma'
import { User, Playlist } from '../types/data'

export const createNewPlaylist = async (user: User) => {
  const newPlaylist = await prisma.playlist.create({
    data: {
      name: 'New Playlist',
      image: `https://picsum.photos/seed/${Math.random() * 100}/400`,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  })
  return newPlaylist
}

export const deletePlaylist = async (playlistId: number) => {
  const deletedPlaylist = await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  })
  return deletedPlaylist
}

export const addSongToPlaylist = async (playlistId: number, songId: number) => {
  const song = await prisma.song.findUnique({
    where: {
      id: songId,
    },
  })

  const { songs } = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
    select: {
      songs: true,
    },
  })

  const addSong = await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    data: {
      songs: {
        connect: [{ id: song?.id }],
      },
    },
  })

  return addSong
}

export const getPlaylists = async (user: User) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return playlists
}

export const addPlaylistsToUser = async (
  playlists: Playlist[],
  user: User,
  songsIds: Object[]
) => {
  const newPlaylists = await Promise.all(
    playlists.map(async (playlist) => {
      const newPlaylist = await prisma.playlist.create({
        data: {
          name: playlist.name,
          image: playlist.image,
          user: {
            connect: {
              id: user.id,
            },
          },
          songs: {
            connect: songsIds,
          },
        },
      })
      return newPlaylist
    })
  )

  return newPlaylists
}
