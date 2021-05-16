import { takeLatest, call, put } from "redux-saga/effects";
import { amtcatalogueConstants } from '../constants';
import * as amtcatalogueActions from "../actions/amtcatalogue";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getAmtCatalogueDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.amtCatalogueRecordFetch(payload));
      if (response && response.data.success) {
        yield put(amtcatalogueActions.getAmtCatalogueDetailsSuccess(response.data));
      } else {
        yield put(amtcatalogueActions.getAmtCatalogueDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(amtcatalogueActions.getAmtCatalogueDetailsFailure(error));
    }
  };
}

function saveAmtCatalogueDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateAmtCatalogueById(id, data));
      }else{
        response = yield call(() => api.insertAmtCatalog(data));
      }
      if (response && response.data.success) {
        yield put(amtcatalogueActions.saveAmtCatalogueDetailsSuccess(response.data));
        history.push(`${routes.AMOUNT_CATALOG_LIST}`);
        //yield put(push(`${routes.AmtCatalogue_LIST}`));
      } else {
        yield put(amtcatalogueActions.saveAmtCatalogueDetailsFailure(response));
     }
    } catch (error) {
      yield put(amtcatalogueActions.saveAmtCatalogueDetailsFailure(error));
    }
  };
}

function getAmtCatalogueList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getAmtCatalogList());
      if (data && data.data.success) {
        yield put(amtcatalogueActions.getAmtCatalogueListSuccess(data.data));
      } else {
        yield put(amtcatalogueActions.getAmtCatalogueListFailure(data));
      }
    } catch (error) {
      yield put(amtcatalogueActions.getAmtCatalogueListFailure(error));
    }
  };
}

function getAmtCatalogueDropdown() {
  
  return function*(actions) {
    
    try {
      const data = yield call(() => api.amtCatalogueDropdown());
      console.log(data);
      if (data && data.data.success) {
        yield put(amtcatalogueActions.getAmtCatalogueDropdownSuccess(data.data));
      } else {
        yield put(amtcatalogueActions.getAmtCatalogueDropdownFailure(data));
      }
    } catch (error) {
      yield put(amtcatalogueActions.getAmtCatalogueDropdownFailure(error));
    }
  };
}

function noAction(){
  return function*(actions){};
}
export function* AmtCataloguesWatcher() {
  yield takeLatest(amtcatalogueConstants.GET_FORM_REQUEST, getAmtCatalogueDetails());
  yield takeLatest(amtcatalogueConstants.SAVE_FORM_REQUEST, saveAmtCatalogueDetails());
  yield takeLatest(amtcatalogueConstants.GET_LIST_REQUEST, getAmtCatalogueList());
  yield takeLatest(amtcatalogueConstants.FORM_DROPDOWN_REQUEST, getAmtCatalogueDropdown());

  // yield takeLatest(amtcatalogueConstants.RESET_DETAILS, noAction());
}


export default [AmtCataloguesWatcher()];
