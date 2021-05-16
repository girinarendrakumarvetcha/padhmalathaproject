import { customerConstants } from '../constants';

export function resetCustomerDetails(payload) {
  return {
    type: customerConstants.RESET_DETAILS
  };
}

export function getCustomerDetailsRequest(payload) {
  return {
    type: customerConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getCustomerDetailsSuccess(data) {
  return {
    type: customerConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getCustomerDetailsFailure(error) {
  return {
    type: customerConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveCustomerDetailsRequest(payload) {
  return {
    type: customerConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveCustomerDetailsSuccess(data) {
  return {
    type: customerConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveCustomerDetailsFailure(error) {
  return {
    type: customerConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getCustomerListRequest() {

  return {
    type: customerConstants.GET_LIST_REQUEST
  };
}

export function getCustomerListSuccess(data) {
  return {
    type: customerConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getCustomerListFailure(error) {
  return {
    type: customerConstants.GET_LIST_FAILURE,
    error
  };
}

export function getCustomerDropdownRequest() {

  return {
    type: customerConstants.FORM_DROPDOWN_REQUEST
  };
}

export function getCustomerDropdownSuccess(data) {
  return {
    type: customerConstants.FORM_DROPDOWN_SUCCESS,
    data
  };
}

export function getCustomerDropdownFailure(error) {
  return {
    type: customerConstants.FORM_DROPDOWN_FAILURE,
    error
  };
}
