import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import API from '../../services/API';
import { setLists, setLoading, setTasks } from './listSlice';

function* fetchMyLists(action) {
   try {
      yield put(setLoading(true));
      const responseData = yield call(API.getAllMyList, action.payload);
      yield put(setLists(responseData));
      yield put(setLoading(false));
   } catch (e) {
      console.log(e)
      yield put(setLoading(false));
   }
}

function* fetchTasks(action) {
   try {
      yield put(setLoading(true));
      const responseData = yield call(API.getTasksByList, action.payload);
      yield put(setTasks(responseData));
      yield put(setLoading(false));
   } catch (e) {
      console.log(e)
      yield put(setLoading(false));
      window.location = '/lists'
   }
}

function* listSaga() {
  yield takeEvery("LISTS_REQUESTED", fetchMyLists);
  yield takeEvery("TASKS_REQUEST", fetchTasks);
}

export default listSaga;