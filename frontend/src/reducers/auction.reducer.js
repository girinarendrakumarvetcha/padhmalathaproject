import { auctionConstants } from '../constants';
import {recordStatus}  from './customdropdown.reducer';


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
            console.log(recordStatus);  
            let sel_staus_dropdown = {};
            if(action.data.data.ma_status ){
                for(var a in recordStatus){
                    if(recordStatus[a]['value'] == action.data.data.ma_status){
                        sel_staus_dropdown = recordStatus[a];
                        action.data.data.ma_status = recordStatus[a];
                    }
                }
            }  
            
            return {
                ...state,
                trans_data:action.data.data.trans_arr,
                sel_amt_catalog_dropdown:action.data.data.sel_amt_catalog_dropdown,
                sel_interval_period:action.data.data.sel_interval_period,
                sel_staus_dropdown:sel_staus_dropdown,
                loading: false,
                error: '',
                form_data: action.data.data
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
        case auctionConstants.SET_TRANS_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                trans_data : [],
                error: ''
            };
        case auctionConstants.SET_TRANS_DATA_SUCCESS:
            return {
                ...state,
                trans_data : action.data,
                loading: false,
                error: ''
            };
        case auctionConstants.SET_TRANS_DATA_FAILURE:
            return {
                loading: false,
                trans_data: [],
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