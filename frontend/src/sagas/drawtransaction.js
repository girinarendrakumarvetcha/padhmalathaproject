import { takeLatest, call, put } from "redux-saga/effects";
import { drawtransactionConstants } from '../constants';
import * as drawtransactionActions from "../actions/drawtransaction";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getDrawTransactionDetails() {
  return function*(actions) {
    try {
      
      const { payload } = actions;
      const response = yield call(() => api.drawTransactionRecordFetch(payload));
      if (response && response.data.success) {
        yield put(drawtransactionActions.getDrawTransactionDetailsSuccess(response.data));
      } else {
        yield put(drawtransactionActions.getDrawTransactionDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(drawtransactionActions.getDrawTransactionDetailsFailure(error));
    }
  };
}

function saveDrawTransactionDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateDrawTransactionById(id, data));
      }else{
        response = yield call(() => api.insertDrawTransaction(data));
      }
      if (response && response.data.success) {
        yield put(drawtransactionActions.saveDrawTransactionDetailsSuccess(response.data));
        history.push(`${routes.DrawTransaction_LIST}`);
        //yield put(push(`${routes.DrawTransaction_LIST}`));
      } else {
        yield put(drawtransactionActions.saveDrawTransactionDetailsFailure(response));
     }
    } catch (error) {
      yield put(drawtransactionActions.saveDrawTransactionDetailsFailure(error));
    }
  };
}

function getDrawTransactionList(url_params) {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getDrawMasterTransList(actions.url_params.id));
      if (data && data.data.success) {
        yield put(drawtransactionActions.getDrawTransactionListSuccess(data.data));
      } else {
        yield put(drawtransactionActions.getDrawTransactionListFailure(data));
      }
    } catch (error) {
      yield put(drawtransactionActions.getDrawTransactionListFailure(error));
    }
  };
}

function noAction(){
  return function*(actions){};
}
export function* DrawTransactionsWatcher() {
  yield takeLatest(drawtransactionConstants.GET_FORM_REQUEST, getDrawTransactionDetails());
  yield takeLatest(drawtransactionConstants.SAVE_FORM_REQUEST, saveDrawTransactionDetails());
  yield takeLatest(drawtransactionConstants.GET_LIST_REQUEST, getDrawTransactionList());
  // yield takeLatest(drawtransactionConstants.RESET_DETAILS, noAction());
}


export default [DrawTransactionsWatcher()];
