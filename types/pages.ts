import { Song, Artist, Playlist, Session } from './data'

export interface HomeProps {
  artists: Artist[]
  playlists: Playlist[]
}

export interface SearchProps {
  artists: Artist[]
  songs: Song[]
  playlists: Playlist[]
}

export interface AppProps {
  Component: any
  pageProps: {
    session: any
    [key: string]: any
  }
}

export interface PlaylistProps {
  playlist: Playlist
}
