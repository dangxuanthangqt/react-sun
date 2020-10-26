import { fork } from "redux-saga/effects";
import { productSaga } from "./productSaga";

function * rootSaga(){
    yield fork(productSaga)
}
export default rootSaga;