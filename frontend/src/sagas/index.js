import { all } from "redux-saga/effects";
import customers from "./customer";


export default function* rootSaga() {

  yield all([
    ...customers,
  ]);
}
