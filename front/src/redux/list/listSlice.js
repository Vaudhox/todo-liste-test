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
    resetList() {
      return {...initialState}
    },
    setLists(state, action) {
        return { ...state, lists: [...action.payload] }
    },
    updateList(state, action) {
      const list = action.payload
      const lists = state.lists.map(item => item.id === list.id ? list : item)
      return { ...state, lists: [...lists] }
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload.loading }
    },
    setTasks(state, action) {
      return { ...state, tasks: [...action.payload] }
    },
    deleteList(state, action) {
      const lists = state.lists.filter(item => item.id != action.payload.listId)
      return { ...state, lists: [...lists] }
    },
    updateTask(state, action) {
      const task = action.payload
      const tasks = state.tasks.map(item => item.id === task.id ? task : item)
      return { ...state, tasks: [...tasks] }
    },
    deleteTask(state, action) {
      const tasks = state.tasks.filter(item => item.id != action.payload.taskId)
      return { ...state, tasks: [...tasks] }
    }
  },
})

export const { resetList, setLists, setLoading, setTasks, updateList, deleteList, updateTask, deleteTask } = listSlice.actions

export default listSlice.reducer
