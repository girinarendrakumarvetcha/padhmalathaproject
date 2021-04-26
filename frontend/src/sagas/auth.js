import { takeLatest, call, put } from "redux-saga/effects";
import {
  ADMIN_LOGIN_REQUEST,
  adminLoginSuccess,
  adminLoginError,
  ADMIN_FP_REQUEST
  // adminFpSuccess,
  // adminFpError
} from "../actions/auth";
import api from "../api/auth";
import { Toast } from "../helpers/toasteMessages";

function adminLogin() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const data = yield call(() => api.adminLogin(payload));
      if (data && data.success) {
        Toast({ type: "success", message: data.message });
        yield put(adminLoginSuccess(data));
      } else {
        Toast({ type: "error", message: data.message });
        yield put(adminLoginError(data));
      }
    } catch (error) {
      yield put(adminLoginError(error));
    }
  };
}

function forgotPassword() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const data = yield call(() => api.forgotPassword(payload));
      if (data && data.success) {
        // yield put(adminLoginSuccess(data));
      } else {
        // yield put(adminLoginError(data));
      }
    } catch (error) {
      //   yield put(adminLoginError(error));
    }
  };
}

export function* adminAuthWatcher() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, adminLogin());
  yield takeLatest(ADMIN_FP_REQUEST, forgotPassword());
}

export default [adminAuthWatcher()];
