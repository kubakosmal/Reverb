import { ReactNode } from 'react'
import { Song, Artist, Playlist, Session } from './data'

export interface HomeProps {
  artists: Artist[]
}

export interface SearchProps {
  artists: Artist[]
  songs: Song[]
  playlists: Playlist[]
}

export interface AppProps {
  Component: any
  pageProps: {
    session: Session
    [key: string]: any
  }
}

export interface PlaylistProps {
  playlist: Playlist
}
