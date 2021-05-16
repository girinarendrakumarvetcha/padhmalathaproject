import { intervalConstants } from '../constants';

export function resetIntervalDetails(payload) {
  return {
    type: intervalConstants.RESET_DETAILS
  };
}

export function getIntervalDetailsRequest(payload) {
  return {
    type: intervalConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getIntervalDetailsSuccess(data) {
  return {
    type: intervalConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getIntervalDetailsFailure(error) {
  return {
    type: intervalConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveIntervalDetailsRequest(payload) {
  return {
    type: intervalConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveIntervalDetailsSuccess(data) {
  return {
    type: intervalConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveIntervalDetailsFailure(error) {
  return {
    type: intervalConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getIntervalListRequest() {

  return {
    type: intervalConstants.GET_LIST_REQUEST
  };
}

export function getIntervalListSuccess(data) {
  return {
    type: intervalConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getIntervalListFailure(error) {
  return {
    type: intervalConstants.GET_LIST_FAILURE,
    error
  };
}