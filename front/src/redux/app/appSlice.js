import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    language: "fr",
    formError: ""
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchLang(state, action) {
        return { ...state, language: action.payload }
    },
    setFormError(state, action) {
      return { ...state, formError: action.payload }
    }
  },
 /* extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      //state.entities.push(action.payload)
    })
  },*/
})

/*export const fetchUserById = createAsyncThunk(
  'app/fetchByIdStatus',
  async (thunkAPI) => {
    const response = {data: "test"}
    
    return response.data
  }
)*/

export const { switchLang, setFormError } = appSlice.actions

export default appSlice.reducer