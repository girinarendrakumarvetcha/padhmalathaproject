import { amtcatalogueConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    dropdown_data: [],
    error: ''
}
export function amtcatalogue(state = initialState, action) {

    switch (action.type) {
        case amtcatalogueConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                error: ''
            };

        case amtcatalogueConstants.GET_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                form_data: [],
                error: ''
            };
        case amtcatalogueConstants.GET_FORM_SUCCESS:
            return {
                ...state,
                form_data: action.data.data,
                loading: false,
                error: ''
            };
        case amtcatalogueConstants.GET_FORM_FAILURE:
            return {
                loading: false,
                form_data: [],
                error: ''
            };

        case amtcatalogueConstants.GET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                list_data: [],
                error: ''
            };
        case amtcatalogueConstants.GET_LIST_SUCCESS:
            return {
                ...state,
                list_data: action.data.data,
                loading: false,
                error: ''
            };
        case amtcatalogueConstants.GET_LIST_FAILURE:
            return {
                loading: false,
                list_data: [],
                error: action.error
            };


        case amtcatalogueConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case amtcatalogueConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case amtcatalogueConstants.DELETE_FAILURE:

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
        
        case amtcatalogueConstants.FORM_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true,
                dropdown_data: [],
                error: ''
            };
        case amtcatalogueConstants.FORM_DROPDOWN_SUCCESS:
            return {
                ...state,
                dropdown_data: action.data.data,
                loading: false,
                error: ''
            };
        case amtcatalogueConstants.FORM_DROPDOWN_FAILURE:

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