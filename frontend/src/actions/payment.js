import { paymentConstants } from '../constants';

export function resetPaymentDetails(payload) {
  return {
    type: paymentConstants.RESET_DETAILS
  };
}

export function getPaymentDetailsRequest(payload) {
  return {
    type: paymentConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getPaymentDetailsSuccess(data) {
  return {
    type: paymentConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getPaymentDetailsFailure(error) {
  return {
    type: paymentConstants.GET_FORM_FAILURE,
    error
  };
}

export function savePaymentDetailsRequest(payload) {
  return {
    type: paymentConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function savePaymentDetailsSuccess(data) {
  return {
    type: paymentConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function savePaymentDetailsFailure(error) {
  return {
    type: paymentConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getPaymentListRequest(payload) {

  return {
    type: paymentConstants.GET_LIST_REQUEST,
    payload
  };
}

export function getPaymentListSuccess(data) {
  return {
    type: paymentConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getPaymentListFailure(error) {
  return {
    type: paymentConstants.GET_LIST_FAILURE,
    error
  };
}