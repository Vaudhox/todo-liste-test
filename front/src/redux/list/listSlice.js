import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  lists: [],
  loading: false,
  tasks: []
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setLists(state, action) {
        return { ...state, lists: [...action.payload] }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload.loading } 
    },
    setTasks(state, action) {
      return { ...state, tasks: [...action.payload] } 
    }
  },
})

export const { setLists, setLoading, setTasks } = listSlice.actions

export default listSlice.reducer
