import { drawtransactionConstants } from '../constants';

export function resetDrawTransactionDetails(payload) {
  return {
    type: drawtransactionConstants.RESET_DETAILS
  };
}

export function getDrawTransactionDetailsRequest(payload) {
  return {
    type: drawtransactionConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getDrawTransactionDetailsSuccess(data) {
  return {
    type: drawtransactionConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getDrawTransactionDetailsFailure(error) {
  return {
    type: drawtransactionConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveDrawTransactionDetailsRequest(payload) {
  return {
    type: drawtransactionConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveDrawTransactionDetailsSuccess(data) {
  return {
    type: drawtransactionConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveDrawTransactionDetailsFailure(error) {
  return {
    type: drawtransactionConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getDrawTransactionListRequest() {

  return {
    type: drawtransactionConstants.GET_LIST_REQUEST
  };
}

export function getDrawTransactionListSuccess(data) {
  return {
    type: drawtransactionConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getDrawTransactionListFailure(error) {
  return {
    type: drawtransactionConstants.GET_LIST_FAILURE,
    error
  };
}