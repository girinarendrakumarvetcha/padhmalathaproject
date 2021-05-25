import { takeLatest, call, put } from "redux-saga/effects";
import { recordTransactionConstants } from '../constants';
import * as recordTransactionActions from "../actions/recordtransaction";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getRecordTransactionCode() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.getRecordTransactionCode(payload));
      if (response && response.data.success) {
        yield put(recordTransactionActions.getRecordTransactionCodeSuccess(response.data));
      } else {
        yield put(recordTransactionActions.getRecordTransactionCodeFailure(response.data));
      }
    } catch (error) {
      yield put(recordTransactionActions.getRecordTransactionCodeFailure(error));
    }
  };
}


export function* RecordTransactionWatcher() {
  yield takeLatest(recordTransactionConstants.GET_CODE_REQUEST, getRecordTransactionCode());
}


export default [RecordTransactionWatcher()];
