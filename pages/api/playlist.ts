import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { User, Song } from '../../types/data'
import { UserSession } from '../../types/data'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const userSession = session?.user as UserSession

  if (!userSession) {
    return res.status(401).json({ unauthorized: true })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userSession.id,
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

const createNewPlaylist = async (user: User) => {
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

const deletePlaylist = async (playlistId: number) => {
  const deletedPlaylist = await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  })
  return deletedPlaylist
}

const addSongToPlaylist = async (playlistId: number, songId: number) => {
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

const getPlaylists = async (user: User) => {
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
