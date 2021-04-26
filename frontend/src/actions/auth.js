const ADMIN_LOGIN_ACTION = "ADMIN/LOGIN";
const ADMIN_FP_ACTION = "ADMIN/FP";

export const ADMIN_LOGIN_REQUEST = `${ADMIN_LOGIN_ACTION}/REQUEST`;
export const ADMIN_LOGIN_SUCCESS = `${ADMIN_LOGIN_ACTION}/SUCCESS`;
export const ADMIN_LOGIN_ERROR = `${ADMIN_LOGIN_ACTION}/ERROR`;

export const ADMIN_FP_REQUEST = `${ADMIN_FP_ACTION}/REQUEST`;
export const ADMIN_FP_SUCCESS = `${ADMIN_FP_ACTION}/SUCCESS`;
export const ADMIN_FP_ERROR = `${ADMIN_FP_ACTION}/ERROR`;

export function adminLoginRequest(payload) {
  return {
    type: ADMIN_LOGIN_REQUEST,
    payload
  };
}

export function adminLoginSuccess(data) {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    data
  };
}

export function adminLoginError(error) {
  return {
    type: ADMIN_LOGIN_ERROR,
    error
  };
}

export function adminFpRequest(payload) {
  return {
    type: ADMIN_FP_REQUEST,
    payload
  };
}

export function adminFpSuccess(data) {
  return {
    type: ADMIN_FP_SUCCESS,
    data
  };
}

export function adminFpError(error) {
  return {
    type: ADMIN_FP_ERROR,
    error
  };
}
