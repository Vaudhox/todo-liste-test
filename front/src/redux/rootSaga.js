import { all, fork } from "redux-saga/effects"
import userSagas from './user/userSaga'
import listSaga from './list/listSaga'

export default function* rootSage() {
    yield all([
        fork(userSagas),
        fork(listSaga)
    ]);
}