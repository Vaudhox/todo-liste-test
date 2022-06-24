import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import API from '../../services/API';
import { setLists, setLoading, setTasks } from './listSlice';
import {notification} from "antd";

function* fetchMyLists() {
   try {
      yield put(setLoading(true));
      const responseData = yield call(API.getAllMyList);
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

function* fetchAddList(action) {
   try {
      yield call(API.addList, action.payload);
      yield call(fetchMyLists)
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on add list"})
   }
}

function* listSaga() {
  yield takeEvery("LISTS_REQUESTED", fetchMyLists);
  yield takeEvery("TASKS_REQUEST", fetchTasks);
  yield takeEvery("ADD_LIST_REQUEST", fetchAddList);
}

export default listSaga;
