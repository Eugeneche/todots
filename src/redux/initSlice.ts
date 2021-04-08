import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sessionAPI } from '../api/api'

export const getSessionId = createAsyncThunk(
  'todo/getSessionId', async (userData, { rejectWithValue }) => {
  try {
    //const { id, ...fields } = userData
    const response = await sessionAPI.initSession()
    //console.log(response.data.sessionId)
    return response.data.sessionId
  } catch (err) {
      //throw err
    // We got validation errors, let's return those so we can reference in our component and set form errors
    //return rejectWithValue(err)
  }
})

const initialState: string = ''

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getSessionId.fulfilled, (state, {payload}) => {
      return state = payload
    })
    builder.addCase(getSessionId.rejected, (state, action) => {
      //let error = action.error.message
    })
  }
})

export default initSlice.reducer
//export const { initializeApp } = initSlice.actions
//export const sessionId = (state: RootState) => state