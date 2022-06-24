import axios from 'axios';
import Store from '../redux/store';
import { logout, setRefreshToken } from '../redux/user/userSlice'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
const instance = axios.create({
    baseURL: BASE_URL
  });

instance.interceptors.request.use((config) => {
  const token = Store.store.getState().user.access_token;

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
})


// Interceptors all response from instance axios
instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async (error)  => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401 && error.response.data.name === "TokenExpiredError") {
    try {
      const response = await axios.post(BASE_URL + 'refresh', null, {
        headers: {
          "refresh-token": Store.store.getState().user.refresh_token
        }
      })
      Store.store.dispatch(setRefreshToken(response.data))

      // Retry the request
      error.config.headers['Authorization'] = 'Bearer ' + response.data.token;
      error.config.baseURL = BASE_URL;

      return await axios.request(error.config);

    } catch (e) {
      Store.store.dispatch(logout())
      window.location.replace('/')
    }
  }
  return Promise.reject(error);
});


  export default instance
