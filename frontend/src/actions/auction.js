import { auctionConstants } from '../constants';

export function resetAuctionDetails(payload) {
  return {
    type: auctionConstants.RESET_DETAILS
  };
}

export function getAuctionDetailsRequest(payload) {
  return {
    type: auctionConstants.GET_FORM_REQUEST,
    payload
  };
}

export function getAuctionDetailsSuccess(data) {
  return {
    type: auctionConstants.GET_FORM_SUCCESS,
    data
  };
}

export function getAuctionDetailsFailure(error) {
  return {
    type: auctionConstants.GET_FORM_FAILURE,
    error
  };
}

export function saveAuctionDetailsRequest(payload) {
  return {
    type: auctionConstants.SAVE_FORM_REQUEST,
    payload
  };
}

export function saveAuctionDetailsSuccess(data) {
  return {
    type: auctionConstants.SAVE_FORM_SUCCESS,
    data
  };
}

export function saveAuctionDetailsFailure(error) {
  return {
    type: auctionConstants.SAVE_FORM_FAILURE,
    error
  };
}

export function getAuctionListRequest() {
  return {
    type: auctionConstants.GET_LIST_REQUEST
  };
}

export function getAuctionListSuccess(data) {
  return {
    type: auctionConstants.GET_LIST_SUCCESS,
    data
  };
}

export function getAuctionListFailure(error) {
  return {
    type: auctionConstants.GET_LIST_FAILURE,
    error
  };
}

export function getAuctionDropdownRequest() {

  return {
    type: auctionConstants.FORM_DROPDOWN_REQUEST
  };
}

export function getAuctionDropdownSuccess(data) {
  return {
    type: auctionConstants.FORM_DROPDOWN_SUCCESS,
    data
  };
}

export function getAuctionDropdownFailure(error) {
  return {
    type: auctionConstants.FORM_DROPDOWN_FAILURE,
    error
  };
}
