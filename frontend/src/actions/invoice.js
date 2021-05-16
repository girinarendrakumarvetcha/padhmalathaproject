import { invoiceConstants } from '../constants';

export function resetInvoiceDetails(payload) {
  return {
    type: invoiceConstants.RESET_DETAILS
  };
}

export function getInvoiceDetailsRequest(payload) {
  return {
    type: invoiceConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getInvoiceDetailsSuccess(data) {
  return {
    type: invoiceConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getInvoiceDetailsFailure(error) {
  return {
    type: invoiceConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveInvoiceDetailsRequest(payload) {
  return {
    type: invoiceConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveInvoiceDetailsSuccess(data) {
  return {
    type: invoiceConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveInvoiceDetailsFailure(error) {
  return {
    type: invoiceConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getInvoiceListRequest(url_params) {

  return {
    type: invoiceConstants.GET_LIST_REQUEST,
    url_params : url_params
  };
}

export function getInvoiceListSuccess(data) {
  return {
    type: invoiceConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getInvoiceListFailure(error) {
  return {
    type: invoiceConstants.GET_LIST_FAILURE,
    error
  };
}