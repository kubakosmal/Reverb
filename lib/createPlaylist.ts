import Router from 'next/router'
import fetcher from './fetcher'

export default async () => {
  const res = await fetcher('/playlist', 'POST')
  let newPlaylistId
  if (res.status == 204) {
    newPlaylistId = res.id
  }
  return newPlaylistId
}
