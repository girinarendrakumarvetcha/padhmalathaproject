import { takeLatest, call, put } from "redux-saga/effects";
import { invoiceConstants } from '../constants';
import * as invoiceActions from "../actions/invoice";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getInvoiceDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.drawInvoiceRecordFetch(payload));
      if (response && response.data.success) {
        yield put(invoiceActions.getInvoiceDetailsSuccess(response.data));
      } else {
        yield put(invoiceActions.getInvoiceDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(invoiceActions.getInvoiceDetailsFailure(error));
    }
  };
}

function saveInvoiceDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateInvoiceById(id, data));
      }else{
        response = yield call(() => api.insertInvoice(data));
      }
      if (response && response.data.success) {
        yield put(invoiceActions.saveInvoiceDetailsSuccess(response.data));
        history.push(`${routes.Invoice_LIST}`);
        //yield put(push(`${routes.Invoice_LIST}`));
      } else {
        yield put(invoiceActions.saveInvoiceDetailsFailure(response));
     }
    } catch (error) {
      yield put(invoiceActions.saveInvoiceDetailsFailure(error));
    }
  };
}

function getInvoiceList(url_params) {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getDrawInvoiceList(actions.url_params.id));
      if (data && data.data.success) {
        yield put(invoiceActions.getInvoiceListSuccess(data.data));
      } else {
        yield put(invoiceActions.getInvoiceListFailure(data));
      }
    } catch (error) {
      yield put(invoiceActions.getInvoiceListFailure(error));
    }
  };
}



function noAction(){
  return function*(actions){};
}
export function* InvoicesWatcher() {
  yield takeLatest(invoiceConstants.GET_FORM_REQUEST, getInvoiceDetails());
  yield takeLatest(invoiceConstants.SAVE_FORM_REQUEST, saveInvoiceDetails());
  yield takeLatest(invoiceConstants.GET_LIST_REQUEST, getInvoiceList());
  // yield takeLatest(invoiceConstants.RESET_DETAILS, noAction());
}


export default [InvoicesWatcher()];
