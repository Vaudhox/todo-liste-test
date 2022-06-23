import Store from '../../redux/store';
import { setLogin } from '../../redux/user/userSlice.js';
import axiosInstance from '../axiosInstance';

export async function register(params) {
    const response = await axiosInstance.post('/register', {
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName,
            password: params.password,
    });
    return response.data
}


export async function login(params) {
    const response = await axiosInstance.post('/login', {
      email: params.email,
      password: params.password,
    });
    return response.data
}

export async function checkEmail(params) {
  const response = await axiosInstance.post('/checkEmail', {
    id: params.id,
    token: params.token,
  });
  return response.data
}

export async function sendVerifyEmail(params) {
  console.log(params)
  const response = await axiosInstance.post('/askCheckEmail', {
    email: params.email,
  });
  return response.data
}

/*export async function whoiam( callback = null) {
  try {
    const response = await axiosInstance.get('/users/whoami');
   // Store.store.dispatch(setLogin(response.data))
    callback && callback()
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      if(Array.isArray(error.response.data.message)) {
        throw "auth." + error.response.data.message[0] // error from validator backend
      } else {
        throw "auth." + error.response.data.message || "common.error"
      }
    }
    throw "common.error"
  }
}
*/