import { takeLatest, call, put } from "redux-saga/effects";
import { customergroupConstants } from '../constants';
import * as customergroupActions from "../actions/customergroup";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getCustomerGroupDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.customerGroupRecordFetch(payload));
      if (response && response.data.success) {
        yield put(customergroupActions.getCustomerGroupDetailsSuccess(response.data));
      } else {
        yield put(customergroupActions.getCustomerGroupDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(customergroupActions.getCustomerGroupDetailsFailure(error));
    }
  };
}

function saveCustomerGroupDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateCustomerGroupById(id, data));
      }else{
        response = yield call(() => api.insertCustomerGroup(data));
      }
      console.log(response);
      if (response && response.data.success) {
        yield put(customergroupActions.saveCustomerGroupDetailsSuccess(response.data));
        history.push(`${routes.CUSTOMER_GROUP_LIST}`);
        window.location.reload();
        //yield put(push(`${routes.CustomerGroup_LIST}`));
      } else {
        yield put(customergroupActions.saveCustomerGroupDetailsFailure(response));
     }
    } catch (error) {
      yield put(customergroupActions.saveCustomerGroupDetailsFailure(error));
    }
  };
}

function getCustomerGroupList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getCustomerGroupList());
      if (data && data.data.success) {
        yield put(customergroupActions.getCustomerGroupListSuccess(data.data));
      } else {
        yield put(customergroupActions.getCustomerGroupListFailure(data));
      }
    } catch (error) {
      yield put(customergroupActions.getCustomerGroupListFailure(error));
    }
  };
}

function getCustomerGroupDropdown() {
  
  return function*(actions) {
    
    try {
      const data = yield call(() => api.drawGroupDropdown());
      console.log(data);
      if (data && data.data.success) {
        yield put(customergroupActions.getCustomerGroupDropdownSuccess(data.data));
      } else {
        yield put(customergroupActions.getCustomerGroupDropdownFailure(data));
      }
    } catch (error) {
      yield put(customergroupActions.getCustomerGroupDropdownFailure(error));
    }
  };
}

function noAction(){
  return function*(actions){};
}
export function* CustomerGroupsWatcher() {
  yield takeLatest(customergroupConstants.GET_FORM_REQUEST, getCustomerGroupDetails());
  yield takeLatest(customergroupConstants.SAVE_FORM_REQUEST, saveCustomerGroupDetails());
  yield takeLatest(customergroupConstants.GET_LIST_REQUEST, getCustomerGroupList());
  yield takeLatest(customergroupConstants.FORM_DROPDOWN_REQUEST, getCustomerGroupDropdown());
  // yield takeLatest(customergroupConstants.RESET_DETAILS, noAction());
}


export default [CustomerGroupsWatcher()];
