import { invoiceConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    error: ''
}
export function invoice(state = initialState, action) {

    switch (action.type) {
        case invoiceConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                error: ''
            };

        case invoiceConstants.GET_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                form_data: [],
                error: ''
            };
        case invoiceConstants.GET_FORM_SUCCESS:
            return {
                ...state,
                form_data: action.data.data,
                loading: false,
                error: ''
            };
        case invoiceConstants.GET_FORM_FAILURE:
            return {
                loading: false,
                form_data: [],
                error: ''
            };

        case invoiceConstants.GET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                list_data: [],
                error: ''
            };
        case invoiceConstants.GET_LIST_SUCCESS:
            return {
                ...state,
                list_data: action.data.data,
                loading: false,
                error: ''
            };
        case invoiceConstants.GET_LIST_FAILURE:
            return {
                loading: false,
                list_data: [],
                error: action.error
            };


        case invoiceConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case invoiceConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case invoiceConstants.DELETE_FAILURE:

            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {

                        const { deleting, ...userCopy } = user;

                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}

// state.merge(
//     Map({
//       ...action
//     })