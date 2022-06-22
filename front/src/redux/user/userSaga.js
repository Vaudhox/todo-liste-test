import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import API from '../../services/API';
import { setLogin } from './userSlice';
import { setFormError } from '../app/appSlice';

function* fetchLogin(action) {
   try {
      yield put(setFormError(""));
      const responseData = yield call(API.login, action.payload);
      yield put(setLogin(responseData));
      window.location = "/"
   } catch (e) {
      console.log(e)
      if (e.response.data.status === 401) { 
         yield put(setFormError("unauthorized"));
      } else {
         yield put(setFormError("error"));
      }
    
   }
}

function* fetchRegister(action) {
   try {
      yield put(setFormError(""));
      const responseData = yield call(API.register, action.payload);
      yield put(setLogin(responseData));
      window.location = "/"
   } catch (e) {
      console.log(e)
      if (e.response.data.status === 401) { 
         yield put(setFormError("unauthorized"));
      } else {
         yield put(setFormError("error"));
      }
    
   }
}
function* userSaga() {
  yield takeEvery("LOGIN_REQUESTED", fetchLogin);
  yield takeEvery("REGISTER_REQUESTED", fetchRegister);
}

export default userSaga;