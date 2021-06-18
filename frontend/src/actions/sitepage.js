import { sitePageConstants } from '../constants';

export function resetSitePageDetails(payload) {
  return {
    type: sitePageConstants.RESET_DETAILS
  };
}

export function getSitePageSearchRequest(payload) {
  return {
    type: sitePageConstants.GET_SEARCH_REQUEST,
    payload
  };
}

export function getSitePageSearchSuccess(data) {
  return {
    type: sitePageConstants.GET_SEARCH_SUCCESS,
    data
  };
}

export function getSitePageSearchFailure(error) {
  return {
    type: sitePageConstants.GET_SEARCH_FAILURE,
    error
  };
}

