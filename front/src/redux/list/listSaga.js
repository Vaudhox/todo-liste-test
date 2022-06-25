import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import API from '../../services/API';
import { setLists, setLoading, setTasks, updateList, deleteList, updateTask, deleteTask, resetList } from './listSlice';
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

function* fetchUpdateList(action) {
   try {
      const response = yield call(API.updateList, action.payload);
      yield put(updateList(response))
      notification.success({message: "List update"})
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on update list"})
   }
}

function* fetchDeleteList(action) {
   try {
      yield call(API.deleteList, action.payload);
      yield put(deleteList(action.payload))
      notification.success({message: "List delete"})
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on update list"})
   }
}

function* fetchUpdateTask(action) {
   try {
      const response = yield call(API.updateTask, action.payload);
      yield put(updateTask(response))
      notification.success({message: "Task update"})
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on task update"})
   }
}

function* fetchDeleteTask(action) {
   try {
      yield call(API.deleteTask, action.payload);
      yield put(deleteTask(action.payload))
      notification.success({message: "Task delete"})
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on task delete"})
   }
}

function* fetchAddTask(action) {
   try {
      const response = yield call(API.addTask, action.payload);
      yield call(fetchTasks, {payload: response})
      notification.success({message: "Task create"})
   } catch (e) {
      console.log(e)
      notification.error({message: "Error on add list"})
   }
}

function* resetStateList() {
   yield put(resetList())
}

function* listSaga() {
  yield takeEvery("LISTS_REQUESTED", fetchMyLists);
  yield takeEvery("TASKS_REQUEST", fetchTasks);
  yield takeEvery("ADD_LIST_REQUEST", fetchAddList);
  yield takeEvery("UPDATE_LIST_REQUEST", fetchUpdateList);
  yield takeEvery("DELETE_LIST_REQUEST", fetchDeleteList);
  yield takeEvery("ADD_TASK_REQUEST", fetchAddTask);
  yield takeEvery("UPDATE_TASK_REQUEST", fetchUpdateTask);
  yield takeEvery("DELETE_TASK_REQUEST", fetchDeleteTask);
  yield takeEvery("user/logout", resetStateList)
}

export default listSaga;
