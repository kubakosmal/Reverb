import { ReactNode } from 'react'
import { Song, Playlist, Artist } from './data'

export interface GradientLayoutProps {
  color: string
  children: ReactNode
  image: string
  subtitle: string
  title: string
  description: string
  roundImage: boolean
}

export interface PlayerProps {
  songs: Song[]
  activeSong: Song
}

export interface PlaylistDropdownProps {
  playlist: Playlist
}

export interface SearchResultsProps {
  query: string
  artists: Artist[]
  songs: Song[]
  playlists: Playlist[]
}

export interface SidebarItemProps {
  item: any
  withIcon: boolean
  bold: boolean
}

export interface CardProps {
  type: string
  subtext: string
  item: Artist | Playlist | Song
}

export interface SongCardProps {
  type: string
  subtext: string
  song: Song
}
