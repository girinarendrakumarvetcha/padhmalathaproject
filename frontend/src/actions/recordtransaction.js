import { recordTransactionConstants } from '../constants';

export function resetRecordTransactionCode(payload) {
  return {
    type: recordTransactionConstants.RESET_DETAILS
  };
}

export function getRecordTransactionCodeRequest(payload) {
  return {
    type: recordTransactionConstants.GET_CODE_REQUEST,
    payload
  };
}

export function getRecordTransactionCodeSuccess(data) {
  return {
    type: recordTransactionConstants.GET_CODE_SUCCESS,
    data
  };
}

export function getRecordTransactionCodeFailure(error) {
  return {
    type: recordTransactionConstants.GET_CODE_FAILURE,
    error
  };
}

export function saveRecordTransactionCodeRequest(payload) {
  return {
    type: recordTransactionConstants.SAVE_CODE_REQUEST,
    payload
  };
}

export function saveRecordTransactionCodeSuccess(data) {
  return {
    type: recordTransactionConstants.SAVE_CODE_SUCCESS,
    data
  };
}

export function saveRecordTransactionCodeFailure(error) {
  return {
    type: recordTransactionConstants.SAVE_CODE_FAILURE,
    error
  };
}
