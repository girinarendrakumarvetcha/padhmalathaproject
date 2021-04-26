import { takeLatest, call, put } from "redux-saga/effects";
import { customerConstants } from '../constants';
import * as customerActions from "../actions/customer";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getCustomerDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.getCustomerById(payload));
      if (response && response.data.success) {
        yield put(customerActions.getCustomerDetailsSuccess(response.data));
      } else {
        yield put(customerActions.getCustomerDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(customerActions.getCustomerDetailsFailure(error));
    }
  };
}

function saveCustomerDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateCustomerById(id, data));
      }else{
        response = yield call(() => api.insertCustomer(data));
      }
      if (response && response.data.success) {
        yield put(customerActions.saveCustomerDetailsSuccess(response.data));
        history.push(`${routes.CUSTOMER_LIST}`);
        //yield put(push(`${routes.CUSTOMER_LIST}`));
      } else {
        yield put(customerActions.saveCustomerDetailsFailure(response));
     }
    } catch (error) {
      yield put(customerActions.saveCustomerDetailsFailure(error));
    }
  };
}

function getCustomerList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getAllCustomers());
      if (data && data.data.success) {
        yield put(customerActions.getCustomerListSuccess(data.data));
      } else {
        yield put(customerActions.getCustomerListFailure(data));
      }
    } catch (error) {
      yield put(customerActions.getCustomerListFailure(error));
    }
  };
}



function noAction(){
  return function*(actions){};
}
export function* customersWatcher() {
  yield takeLatest(customerConstants.GET_FORM_REQUEST, getCustomerDetails());
  yield takeLatest(customerConstants.SAVE_FORM_REQUEST, saveCustomerDetails());
  yield takeLatest(customerConstants.GET_LIST_REQUEST, getCustomerList());
  // yield takeLatest(customerConstants.RESET_DETAILS, noAction());
}


export default [customersWatcher()];
