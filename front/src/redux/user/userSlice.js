import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
  email: "",
  firstName: "",
  lastName: "",
  refresh_token: "",
  remember_me: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
        const { token, refreshToken, ...other } = action.payload
        return { ...state, ...other, access_token: token, refresh_token: refreshToken }
    },
    logout(state, action) {
      return { ...initialState}
    },
    setRefreshToken(state, action) {
      const { token, refreshToken } = action.payload
      return { ...state, access_token: token, refresh_token: refreshToken }
    },
    setRememberMe(state, action) {
      return { ...state, remember_me: action.payload}
    }
  },
})

export const { setLogin, logout, setRefreshToken, setRememberMe } = userSlice.actions

export default userSlice.reducer
