import { takeLatest, call, put } from "redux-saga/effects";
import { intervalConstants } from '../constants';
import * as intervalActions from "../actions/interval";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getIntervalDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.intervalRecordFetch(payload));
      if (response && response.data.success) {
        yield put(intervalActions.getIntervalDetailsSuccess(response.data));
      } else {
        yield put(intervalActions.getIntervalDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(intervalActions.getIntervalDetailsFailure(error));
    }
  };
}

function saveIntervalDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateIntervalById(id, data));
      }else{
        response = yield call(() => api.insertInterval(data));
      }
      if (response && response.data.success) {
        yield put(intervalActions.saveIntervalDetailsSuccess(response.data));
        history.push(`${routes.Interval_LIST}`);
        //yield put(push(`${routes.Interval_LIST}`));
      } else {
        yield put(intervalActions.saveIntervalDetailsFailure(response));
     }
    } catch (error) {
      yield put(intervalActions.saveIntervalDetailsFailure(error));
    }
  };
}

function getIntervalList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getAllIntervals());
      if (data && data.data.success) {
        yield put(intervalActions.getIntervalListSuccess(data.data));
      } else {
        yield put(intervalActions.getIntervalListFailure(data));
      }
    } catch (error) {
      yield put(intervalActions.getIntervalListFailure(error));
    }
  };
}



function noAction(){
  return function*(actions){};
}
export function* IntervalsWatcher() {
  yield takeLatest(intervalConstants.GET_FORM_REQUEST, getIntervalDetails());
  yield takeLatest(intervalConstants.SAVE_FORM_REQUEST, saveIntervalDetails());
  yield takeLatest(intervalConstants.GET_LIST_REQUEST, getIntervalList());
  // yield takeLatest(intervalConstants.RESET_DETAILS, noAction());
}


export default [IntervalsWatcher()];
