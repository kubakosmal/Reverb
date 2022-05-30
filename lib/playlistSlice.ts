import { createSlice } from '@reduxjs/toolkit'

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    activeSongs: [],
    activeSong: null,
  },
  reducers: {
    changeActiveSongs: (state, action) => {
      state.activeSongs = action.payload
    },
    changeActiveSong: (state, action) => {
      state.activeSong = action.payload
    },
  },
})

export const { changeActiveSongs, changeActiveSong } = playlistSlice.actions

export default playlistSlice.reducer
