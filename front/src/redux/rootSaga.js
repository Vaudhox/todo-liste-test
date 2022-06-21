import { all, fork } from "redux-saga/effects"
import userSagas from './user/userSaga'

export default function* rootSage() {
    yield all([
        fork(userSagas)
    ]);
}