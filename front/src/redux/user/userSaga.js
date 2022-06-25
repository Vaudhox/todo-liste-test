import { call, put, takeEvery } from 'redux-saga/effects'
import API from '../../services/API';
import { setLogin, confirmEmail } from './userSlice';
import { setFormError } from '../app/appSlice';

function* fetchLogin(action) {
   try {
      yield put(setFormError(""));
      const responseData = yield call(API.login, action.payload);
      if (responseData.emailConfirm) {
         yield put(setLogin(responseData));
         window.location = "/lists"
      } else {
         window.location = "/checkEmail"
      }
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
      yield call(API.register, action.payload);
      window.location = "/checkEmail"
   } catch (e) {
      console.log(e)
      if (e.response.data.status === 401) {
         yield put(setFormError("unauthorized"));
      } else {
         yield put(setFormError("error"));
      }

   }
}

function* fetchCheckEmail(action) {
   try {
      yield put(setFormError(""));
      const responseData = yield call(API.checkEmail, action.payload);
      window.location = "/login?emailConfirm=true"
   } catch (e) {
      console.log(e)
      setFormError("error-check-email")
   }
}

function* fetchSendVerifyEmail(action) {
   try {
      console.log(action)
      yield call(API.sendVerifyEmail, action.payload);
   } catch (e) {
      console.log(e);
   }
}

function* userSaga() {
  yield takeEvery("LOGIN_REQUESTED", fetchLogin);
  yield takeEvery("REGISTER_REQUESTED", fetchRegister);
  yield takeEvery("CHECK_EMAIL_REQUESTED", fetchCheckEmail);
  yield takeEvery("SEND_VERIFY_EMAIL_REQUESTED", fetchSendVerifyEmail);
}

export default userSaga;
