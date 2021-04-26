const ADMIN_CATEGORIES_ACTION = "ADMIN/CATEGORIES";

export const ADMIN_GET_CATEGORIES_REQUEST = `${ADMIN_CATEGORIES_ACTION}/GET_ALL/REQUEST`;
export const ADMIN_GET_CATEGORIES_SUCCESS = `${ADMIN_CATEGORIES_ACTION}/GET_ALL/SUCCESS`;
export const ADMIN_GET_CATEGORIES_ERROR = `${ADMIN_CATEGORIES_ACTION}/GET_ALL/ERROR`;

// export const ADMIN_GET_CUSTOMER_REQUEST = `${ADMIN_CUSTOMERS_ACTION}/GET/REQUEST`;
// export const ADMIN_GET_CUSTOMER_SUCCESS = `${ADMIN_CUSTOMERS_ACTION}/GET/SUCCESS`;
// export const ADMIN_GET_CUSTOMER_ERROR = `${ADMIN_CUSTOMERS_ACTION}/GET/ERROR`;

export const ADMIN_ADD_CATEGORY_REQUEST = `${ADMIN_CATEGORIES_ACTION}/ADD/REQUEST`;
export const ADMIN_ADD_CATEGORY_SUCCESS = `${ADMIN_CATEGORIES_ACTION}/ADD/SUCCESS`;
export const ADMIN_ADD_CATEGORY_ERROR = `${ADMIN_CATEGORIES_ACTION}/ADD/ERROR`;

// export const ADMIN_UPDATE_CUSTOMER_REQUEST = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/REQUEST`;
// export const ADMIN_UPDATE_CUSTOMER_SUCCESS = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/SUCCESS`;
// export const ADMIN_UPDATE_CUSTOMER_ERROR = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/ERROR`;

// export const ADMIN_STATUS_UPDATE_CUSTOMER_REQUEST = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/STATUS/REQUEST`;
// export const ADMIN_STATUS_UPDATE_CUSTOMER_SUCCESS = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/STATUS/SUCCESS`;
// export const ADMIN_STATUS_UPDATE_CUSTOMER_ERROR = `${ADMIN_CUSTOMERS_ACTION}/UPDATE/STATUS/ERROR`;

export const ADMIN_CATEGORY_SS = `${ADMIN_CATEGORIES_ACTION}/SET`;

export function adminGetCategoriesRequest(payload) {
  return {
    type: ADMIN_GET_CATEGORIES_REQUEST,
    payload
  };
}

export function adminGetCategoriesSuccess(data) {
  return {
    type: ADMIN_GET_CATEGORIES_SUCCESS,
    data
  };
}

export function adminGetCategoriesError(error) {
  return {
    type: ADMIN_GET_CATEGORIES_ERROR,
    error
  };
}

// export function adminGetCustomerRequest(id) {
//   return {
//     type: ADMIN_GET_CUSTOMER_REQUEST,
//     id
//   };
// }

// export function adminGetCustomerSuccess(data) {
//   return {
//     type: ADMIN_GET_CUSTOMER_SUCCESS,
//     data
//   };
// }

// export function adminGetCustomerError(error) {
//   return {
//     type: ADMIN_GET_CUSTOMER_ERROR,
//     error
//   };
// }

export function adminAddCategoryRequest(payload) {
  return {
    type: ADMIN_ADD_CATEGORY_REQUEST,
    payload
  };
}

export function adminAddCategorySuccess(data) {
  return {
    type: ADMIN_ADD_CATEGORY_SUCCESS,
    data
  };
}

export function adminAddCategoryError(error) {
  return {
    type: ADMIN_ADD_CATEGORY_ERROR,
    error
  };
}

// export function adminUpdateCustomerRequest(id, payload) {
//   return {
//     type: ADMIN_UPDATE_CUSTOMER_REQUEST,
//     id,
//     payload
//   };
// }

// export function adminUpdateCustomerSuccess(data) {
//   return {
//     type: ADMIN_UPDATE_CUSTOMER_SUCCESS,
//     data
//   };
// }

// export function adminUpdateCustomerError(error) {
//   return {
//     type: ADMIN_UPDATE_CUSTOMER_ERROR,
//     error
//   };
// }

// export function adminStatusUpdateCustomerRequest(payload) {
//   return {
//     type: ADMIN_STATUS_UPDATE_CUSTOMER_REQUEST,
//     payload
//   };
// }

// export function adminStatusUpdateCustomerSuccess(data) {
//   return {
//     type: ADMIN_STATUS_UPDATE_CUSTOMER_SUCCESS,
//     data
//   };
// }

// export function adminStatusUpdateCustomerError(error) {
//   return {
//     type: ADMIN_STATUS_UPDATE_CUSTOMER_ERROR,
//     error
//   };
// }

export function adminCustomersSS(newState) {
  return {
    type: ADMIN_CATEGORY_SS,
    newState
  };
}
