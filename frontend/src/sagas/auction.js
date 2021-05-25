import { takeLatest, call, put } from "redux-saga/effects";
import { auctionConstants } from '../constants';
import * as auctionActions from "../actions/auction";
import { routes } from "../config/routes";
//import history from '../config/history';
import { push } from 'react-router-redux';    
import api from "../api";

function getAuctionDetails() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const response = yield call(() => api.auctionRecordFetch(payload));
      if (response && response.data.success) {
        yield put(auctionActions.getAuctionDetailsSuccess(response.data));
      } else {
        yield put(auctionActions.getAuctionDetailsFailure(response.data));
      }
    } catch (error) {
      yield put(auctionActions.getAuctionDetailsFailure(error));
    }
  };
}

function saveAuctionDetails() {
  
  return function*(actions) {
    try {

      const { data , id , history } = actions.payload;
      console.log(actions);
      let response = {};
      if(typeof id != 'undefined' && id){
        response = yield call(() => api.updateAuctionDetails(id, data));
      }else{
        response = yield call(() => api.insertAuctionDetails(data));
      }
      if (response && response.data.success) {
        yield put(auctionActions.saveAuctionDetailsSuccess(response.data));
        history.push(`${routes.CHIT_MASTER_LIST}`);
        window.location.reload();
        //yield put(push(`${routes.Auction_LIST}`));
      } else {
        yield put(auctionActions.saveAuctionDetailsFailure(response));
     }
    } catch (error) {
      yield put(auctionActions.saveAuctionDetailsFailure(error));
    }
  };
}

function getAuctionList() {
  
  return function*(actions) {
    try {
      const data = yield call(() => api.getAuctionList());
      
      if (data && data.data.success) {
        yield put(auctionActions.getAuctionListSuccess(data.data));
      } else {
        yield put(auctionActions.getAuctionListFailure(data));
      }
    } catch (error) {
      yield put(auctionActions.getAuctionListFailure(error));
    }
  };
}


function getAuctionDropdown() {
  
  return function*(actions) {
    
    try {
      const data = yield call(() => api.auctionDropdown());
      console.log(data);
      if (data && data.data.success) {
        yield put(auctionActions.getAuctionDropdownSuccess(data.data));
      } else {
        yield put(auctionActions.getAuctionDropdownFailure(data));
      }
    } catch (error) {
      yield put(auctionActions.getAuctionDropdownFailure(error));
    }
  };
}

function setAuctionTransData() {
  
  return function*(actions) {
    
    try {
      const { payload } = actions;
      yield put(auctionActions.setTransDataSuccess(payload));
    } catch (error) {
      yield put(auctionActions.setTransDataFailure(error));
    }
  };
}

function noAction(){
  return function*(actions){};
}
export function* AuctionsWatcher() {
  yield takeLatest(auctionConstants.GET_FORM_REQUEST, getAuctionDetails());
  yield takeLatest(auctionConstants.SAVE_FORM_REQUEST, saveAuctionDetails());
  yield takeLatest(auctionConstants.GET_LIST_REQUEST, getAuctionList());
  yield takeLatest(auctionConstants.FORM_DROPDOWN_REQUEST, getAuctionDropdown());
  yield takeLatest(auctionConstants.SET_TRANS_DATA_REQUEST, setAuctionTransData());
  // yield takeLatest(auctionConstants.RESET_DETAILS, noAction());
}


export default [AuctionsWatcher()];
