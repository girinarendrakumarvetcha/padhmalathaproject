import { takeLatest, call, put } from "redux-saga/effects";
import { sitePageConstants } from '../constants';
import * as sitePageActions from "../actions/sitepage";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getSitePageSearch() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.getSitePageSearch(payload));
      if (response && response.data.success) {
        yield put(sitePageActions.getSitePageSearchSuccess(response.data));
      } else {
        yield put(sitePageActions.getSitePageSearchFailure(response.data));
      }
    } catch (error) {
      yield put(sitePageActions.getSitePageSearchFailure(error));
    }
  };
}


export function* sitePageWatcher() {
  yield takeLatest(sitePageConstants.GET_SEARCH_REQUEST, getSitePageSearch());
}


export default [sitePageWatcher()];
