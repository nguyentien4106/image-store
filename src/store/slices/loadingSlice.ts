import { LoadingState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: LoadingState = {
  isLoading: false,
  loadingText: undefined,
  isSmall: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; loadingText?: string, isSmall?: boolean}>) => {
      state.isLoading = action.payload.isLoading
      state.loadingText = action.payload.loadingText
      state.isSmall = action.payload.isSmall ?? false
    },
    startLoading: (state, action: PayloadAction<string>) => {
      state.isLoading = true
      state.loadingText = action.payload
    },
    stopLoading: (state) => {
      state.isLoading = false
      state.loadingText = undefined
    },
  },
})

export const { setLoading, startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer 