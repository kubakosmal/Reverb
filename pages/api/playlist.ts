import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ unauthorized: true })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (req.method == 'POST') {
    const newPlaylist = await createNewPlaylist(user)
    res.json(newPlaylist)
  } else if (req.method == 'DELETE') {
    const deletedPlaylist = await deletePlaylist(req.body.playlistId)
    res.json(deletedPlaylist)
  } else if (req.method == 'PUT') {
    const updatedPlaylist = await addSongToPlaylist(
      req.body.playlistId,
      req.body.songId
    )
    res.json(updatedPlaylist)
  } else if (req.method == 'PATCH') {
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: req.body.playlistId,
      },
      data: {
        name: req.body.newName,
      },
    })
    res.json(updatedPlaylist)
  } else {
    const playlists = await getPlaylists(user)
    res.json(playlists)
  }
}

const createNewPlaylist = async (user) => {
  const newPlaylist = await prisma.playlist.create({
    data: {
      name: 'New Playlist',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
  return newPlaylist
}

const deletePlaylist = async (playlistId) => {
  const deletedPlaylist = await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  })
  return deletedPlaylist
}

const addSongToPlaylist = async (playlistId, songId) => {
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
        connect: [{ id: song.id }],
      },
    },
  })

  return addSong
}

const getPlaylists = async (user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return playlists
}
