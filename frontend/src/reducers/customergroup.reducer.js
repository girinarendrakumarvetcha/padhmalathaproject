import { customergroupConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    dropdown_data : [],
    error: ''
}
export function customergroup(state = initialState, action) {

    switch (action.type) {
        case customergroupConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                error: ''
            };

        case customergroupConstants.GET_FORM_REQUEST:
            
        return {
                ...state,
                loading: true,
                form_data: [],
                error: ''
            };
        case customergroupConstants.GET_FORM_SUCCESS:
        return {
                ...state,
                form_data: action.data.data,
                loading: false,
                error: ''
            };
        case customergroupConstants.GET_FORM_FAILURE:
            return {
                loading: false,
                form_data: [],
                error: ''
            };

        case customergroupConstants.GET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                list_data: [],
                error: ''
            };
        case customergroupConstants.GET_LIST_SUCCESS:
            return {
                ...state,
                list_data: action.data.data,
                loading: false,
                error: ''
            };
        case customergroupConstants.GET_LIST_FAILURE:
            return {
                loading: false,
                list_data: [],
                error: action.error
            };

        case customergroupConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case customergroupConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case customergroupConstants.DELETE_FAILURE:

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
        case customergroupConstants.SELECTED_DROPDOWN_DETAILS:
            return {} ;
        case customergroupConstants.FORM_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true,
                dropdown_data: [],
                error: ''
            };
        case customergroupConstants.FORM_DROPDOWN_SUCCESS:
            return {
                ...state,
                dropdown_data: action.data.data,
                loading: false,
                error: ''
            };
        case customergroupConstants.FORM_DROPDOWN_FAILURE:

            return {
                loading: false,
                dropdown_data: [],
                error: action.error
            };       
        default:
            return state
    }
}

// state.merge(
//     Map({
//       ...action
//     })