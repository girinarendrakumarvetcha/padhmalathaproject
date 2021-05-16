import { drawlogConstants } from '../constants';

export function resetDrawLogDetails(payload) {
  return {
    type: drawlogConstants.RESET_DETAILS
  };
}

export function getDrawLogDetailsRequest(payload) {
  return {
    type: drawlogConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getDrawLogDetailsSuccess(data) {
  return {
    type: drawlogConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getDrawLogDetailsFailure(error) {
  return {
    type: drawlogConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveDrawLogDetailsRequest(payload) {
  return {
    type: drawlogConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveDrawLogDetailsSuccess(data) {
  return {
    type: drawlogConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveDrawLogDetailsFailure(error) {
  return {
    type: drawlogConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getDrawLogListRequest() {

  return {
    type: drawlogConstants.GET_LIST_REQUEST
  };
}

export function getDrawLogListSuccess(data) {
  return {
    type: drawlogConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getDrawLogListFailure(error) {
  return {
    type: drawlogConstants.GET_LIST_FAILURE,
    error
  };
}