export interface Song {
  id: number
  createdAt: Date | string | undefined
  updatedAt: Date | string | undefined
  name: string
  artist: Artist
  artistId: number
  playlists: Playlist[]
  duration: number
  url: string
  image?: string
}

export interface Artist {
  id: number
  createdAt: Date
  updatedAt: Date
  songs: Song[]
  name: string
  image: string
}

export interface Playlist {
  id: number
  createdAt: Date | string | undefined
  updatedAt: Date | string | undefined
  name: string
  songs: Song[]
  user: User
  userId: string
  route?: string
  image: string
}

export interface User {
  id: string
  name?: string | null | undefined
  email?: string | undefined | null
  emailVerified?: Date | null
  image?: string
  accounts?: Account[]
  sessions?: Session[]
  playlists?: Playlist[]
}

export interface UserSession {
  id?: string
  name?: string
  email?: string
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: User
}

export interface Providers {
  [key: string]: Provider
}

export interface Provider {
  id: string
  name: string
  type: string
  signinUrl: string
}
