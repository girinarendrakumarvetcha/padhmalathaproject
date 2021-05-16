import { customergroupConstants } from '../constants';

export function resetCustomerGroupDetails(payload) {
  return {
    type: customergroupConstants.RESET_DETAILS
  };
}

export function getCustomerGroupDetailsRequest(payload) {
  return {
    type: customergroupConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getCustomerGroupDetailsSuccess(data) {
  return {
    type: customergroupConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getCustomerGroupDetailsFailure(error) {
  return {
    type: customergroupConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveCustomerGroupDetailsRequest(payload) {
  return {
    type: customergroupConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveCustomerGroupDetailsSuccess(data) {
  return {
    type: customergroupConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveCustomerGroupDetailsFailure(error) {
  return {
    type: customergroupConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getCustomerGroupListRequest() {
  return {
    type: customergroupConstants.GET_LIST_REQUEST
  };
}

export function getCustomerGroupListSuccess(data) {
  return {
    type: customergroupConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getCustomerGroupListFailure(error) {
  return {
    type: customergroupConstants.GET_LIST_FAILURE,
    error
  };
}

export function getSelectedCustomerDropdownRequest() {
  return {
    type: customergroupConstants.SELECTED_DROPDOWN_DETAILS
  };
}

export function getCustomerGroupDropdownRequest() {

  return {
    type: customergroupConstants.FORM_DROPDOWN_REQUEST
  };
}

export function getCustomerGroupDropdownSuccess(data) {
  return {
    type: customergroupConstants.FORM_DROPDOWN_SUCCESS,
    data
  };
}

export function getCustomerGroupDropdownFailure(error) {
  return {
    type: customergroupConstants.FORM_DROPDOWN_FAILURE,
    error
  };
}
