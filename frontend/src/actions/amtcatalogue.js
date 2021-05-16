import { amtcatalogueConstants } from '../constants';

export function resetAmtCatalogueDetails(payload) {
  return {
    type: amtcatalogueConstants.RESET_DETAILS
  };
}

export function getAmtCatalogueDetailsRequest(payload) {
  return {
    type: amtcatalogueConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getAmtCatalogueDetailsSuccess(data) {
  return {
    type: amtcatalogueConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getAmtCatalogueDetailsFailure(error) {
  return {
    type: amtcatalogueConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveAmtCatalogueDetailsRequest(payload) {
  return {
    type: amtcatalogueConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveAmtCatalogueDetailsSuccess(data) {
  return {
    type: amtcatalogueConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveAmtCatalogueDetailsFailure(error) {
  return {
    type: amtcatalogueConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getAmtCatalogueListRequest() {
  
  return {
    type: amtcatalogueConstants.GET_LIST_REQUEST
  };
}

export function getAmtCatalogueListSuccess(data) {
  return {
    type: amtcatalogueConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getAmtCatalogueListFailure(error) {
  return {
    type: amtcatalogueConstants.GET_LIST_FAILURE,
    error
  };
}

export function getAmtCatalogueDropdownRequest() {

  return {
    type: amtcatalogueConstants.FORM_DROPDOWN_REQUEST
  };
}

export function getAmtCatalogueDropdownSuccess(data) {
  return {
    type: amtcatalogueConstants.FORM_DROPDOWN_SUCCESS,
    data
  };
}

export function getAmtCatalogueDropdownFailure(error) {
  return {
    type: amtcatalogueConstants.FORM_DROPDOWN_FAILURE,
    error
  };
}
