import { takeLatest, call, put } from "redux-saga/effects";
import {
  ADMIN_GET_CATEGORIES_REQUEST,
  adminGetCategoriesSuccess,
  adminGetCategoriesError,
  ADMIN_ADD_CATEGORY_REQUEST,
  adminAddCategorySuccess,
  adminAddCategoryError
  // ADMIN_GET_CUSTOMER_REQUEST,
  // adminGetCustomerSuccess,
  // adminGetCustomerError,
  // ADMIN_UPDATE_CUSTOMER_REQUEST,
  // adminUpdateCustomerSuccess,
  // adminUpdateCustomerError,
  // ADMIN_STATUS_UPDATE_CUSTOMER_REQUEST,
  // adminStatusUpdateCustomerSuccess,
  // adminStatusUpdateCustomerError
} from "../actions/categories";
import api from "../api/categories";

function getCategories() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const data = yield call(() => api.getCategories(payload));

      if (data && data.success) {
        yield put(adminGetCategoriesSuccess(data));
      } else {
        yield put(adminGetCategoriesError(data));
      }
    } catch (error) {
      yield put(adminGetCategoriesError(error));
    }
  };
}

// function getCustomer() {
//   return function*(actions) {
//     try {
//       const { id } = actions;
//       const data = yield call(() => api.getCustomer(id));
//       if (data && data.success) {
//         yield put(adminGetCustomerSuccess(data));
//       } else {
//         yield put(adminGetCustomerError(data));
//       }
//     } catch (error) {
//       yield put(adminGetCustomerError(error));
//     }
//   };
// }

function addCCategory() {
  return function*(actions) {
    try {
      const { payload } = actions;
      const data = yield call(() => api.addCategory(payload));
      if (data && data.success) {
        yield put(adminAddCategorySuccess(data));
      } else {
        yield put(adminAddCategoryError(data));
      }
    } catch (error) {
      yield put(adminAddCategoryError(error));
    }
  };
}

// function updateCustomer() {
//   return function*(actions) {
//     try {
//       const { id, payload } = actions;
//       const data = yield call(() => api.updateCustomer(id, payload));
//       if (data && data.success) {
//         yield put(adminUpdateCustomerSuccess(data));
//       } else {
//         yield put(adminUpdateCustomerError(data));
//       }
//     } catch (error) {
//       yield put(adminUpdateCustomerError(error));
//     }
//   };
// }

// function updateStatusCustomer() {
//   return function*(actions) {
//     try {
//       const { payload } = actions;
//       const data = yield call(() => api.updateStatusCustomer(payload));

//       if (data && data.success) {
//         yield put(adminStatusUpdateCustomerSuccess(data));
//       } else {
//         yield put(adminStatusUpdateCustomerError(data));
//       }
//     } catch (error) {
//       //   yield put(adminStatusUpdateCustomerError(error));
//     }
//   };
// }

export function* adminCustomersWatcher() {
  yield takeLatest(ADMIN_GET_CATEGORIES_REQUEST, getCategories());
  // yield takeLatest(ADMIN_GET_CUSTOMER_REQUEST, getCustomer());
  yield takeLatest(ADMIN_ADD_CATEGORY_REQUEST, addCCategory());
  // yield takeLatest(ADMIN_UPDATE_CUSTOMER_REQUEST, updateCustomer());
  // yield takeLatest(
  //   ADMIN_STATUS_UPDATE_CUSTOMER_REQUEST,
  //   updateStatusCustomer()
  // );
}

export default [adminCustomersWatcher()];
