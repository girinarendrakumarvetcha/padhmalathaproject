import { takeLatest, call, put } from "redux-saga/effects";
import { drawlogConstants } from '../constants';
import * as drawlogActions from "../actions/drawlog";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getDrawLogDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.drawlogRecordFetch(payload));
      if (response && response.data.success) {
        yield put(drawlogActions.getDrawLogDetailsSuccess(response.data));
      } else {
        yield put(drawlogActions.getDrawLogDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(drawlogActions.getDrawLogDetailsFailure(error));
    }
  };
}

function saveDrawLogDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateDrawLogById(id, data));
      }else{
        response = yield call(() => api.insertDrawLog(data));
      }
      if (response && response.data.success) {
        yield put(drawlogActions.saveDrawLogDetailsSuccess(response.data));
        history.push(`${routes.DRAW_MASTER_LIST}`);
        //yield put(push(`${routes.DrawLog_LIST}`));
        window.location.reload();
      } else {
        yield put(drawlogActions.saveDrawLogDetailsFailure(response));
     }
    } catch (error) {
      yield put(drawlogActions.saveDrawLogDetailsFailure(error));
    }
  };
}

function getDrawLogList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getDrawList());
      if (data && data.data.success) {
        yield put(drawlogActions.getDrawLogListSuccess(data.data));
      } else {
        yield put(drawlogActions.getDrawLogListFailure(data));
      }
    } catch (error) {
      yield put(drawlogActions.getDrawLogListFailure(error));
    }
  };
}



function noAction(){
  return function*(actions){};
}
export function* DrawLogsWatcher() {
  yield takeLatest(drawlogConstants.GET_FORM_REQUEST, getDrawLogDetails());
  yield takeLatest(drawlogConstants.SAVE_FORM_REQUEST, saveDrawLogDetails());
  yield takeLatest(drawlogConstants.GET_LIST_REQUEST, getDrawLogList());
  // yield takeLatest(drawlogConstants.RESET_DETAILS, noAction());
}


export default [DrawLogsWatcher()];
