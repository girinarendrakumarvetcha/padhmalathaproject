import { auctionConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    trans_data: [],
    dropdown_data: [],
    sel_amt_catalog_dropdown:{},
    sel_interval_period : {},
    error: ''
}
export function auction(state = initialState, action) {

    switch (action.type) {
        case auctionConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                error: ''
            };

        case auctionConstants.GET_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                form_data: [],
                trans_data:[],
                sel_amt_catalog_dropdown : {},
                sel_interval_period : {},
                error: ''
            };
        case auctionConstants.GET_FORM_SUCCESS:
            return {
                ...state,
                form_data: action.data.data,
                trans_data:action.data.data.trans_arr,
                sel_amt_catalog_dropdown:action.data.data.sel_amt_catalog_dropdown,
                sel_interval_period:action.data.data.sel_interval_period,
                loading: false,
                error: ''
            };
        case auctionConstants.GET_FORM_FAILURE:
            return {
                loading: false,
                form_data: [],
                trans_data:[],
                sel_amt_catalog_dropdown : {},
                sel_interval_period : {},
                error: ''
            };

        case auctionConstants.GET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                list_data: [],
                error: ''
            };
        case auctionConstants.GET_LIST_SUCCESS:
            return {
                ...state,
                list_data: action.data.data,
                loading: false,
                error: ''
            };
        case auctionConstants.GET_LIST_FAILURE:
            return {
                loading: false,
                list_data: [],
                error: action.error
            };


        case auctionConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case auctionConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case auctionConstants.DELETE_FAILURE:

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
        case auctionConstants.FORM_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true,
                dropdown_data: [],
                error: ''
            };
        case auctionConstants.FORM_DROPDOWN_SUCCESS:
            return {
                ...state,
                dropdown_data: action.data.data,
                loading: false,
                error: ''
            };
        case auctionConstants.FORM_DROPDOWN_FAILURE:

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