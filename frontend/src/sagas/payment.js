import { takeLatest, call, put } from "redux-saga/effects";
import { paymentConstants } from '../constants';
import * as paymentActions from "../actions/payment";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getPaymentDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.paymentRecordFetch(payload));
      if (response && response.data.success) {
        yield put(paymentActions.getPaymentDetailsSuccess(response.data));
      } else {
        yield put(paymentActions.getPaymentDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(paymentActions.getPaymentDetailsFailure(error));
    }
  };
}

function savePaymentDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updatePaymentById(id, data));
      }else{
        response = yield call(() => api.insertPayment(data));
      }
      if (response && response.data.success) {
        yield put(paymentActions.savePaymentDetailsSuccess(response.data));
        history.push(`${routes.Payment_LIST}`);
        //yield put(push(`${routes.Payment_LIST}`));
      } else {
        yield put(paymentActions.savePaymentDetailsFailure(response));
     }
    } catch (error) {
      yield put(paymentActions.savePaymentDetailsFailure(error));
    }
  };
}

function getPaymentList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getDrawInvoicePaymentList());
      if (data && data.data.success) {
        yield put(paymentActions.getPaymentListSuccess(data.data));
      } else {
        yield put(paymentActions.getPaymentListFailure(data));
      }
    } catch (error) {
      yield put(paymentActions.getPaymentListFailure(error));
    }
  };
}



function noAction(){
  return function*(actions){};
}
export function* PaymentsWatcher() {
  yield takeLatest(paymentConstants.GET_FORM_REQUEST, getPaymentDetails());
  yield takeLatest(paymentConstants.SAVE_FORM_REQUEST, savePaymentDetails());
  yield takeLatest(paymentConstants.GET_LIST_REQUEST, getPaymentList());
  // yield takeLatest(paymentConstants.RESET_DETAILS, noAction());
}


export default [PaymentsWatcher()];
