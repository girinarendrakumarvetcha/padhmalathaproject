import { sitePageConstants } from '../constants';
const initialState = {
    loading: false,
    table_data : [],
    error: ''
}
export function sitepage(state = initialState, action) {

    switch (action.type) {
        case sitePageConstants.RESET_DETAILS:
            return {
                loading: false,
                table_data : [],
                error: ''
            };

        case sitePageConstants.GET_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case sitePageConstants.GET_SEARCH_SUCCESS:
            return {
                ...state,
                table_data : action.data.data,
                loading: false,
                error: ''
            };
        case sitePageConstants.GET_SEARCH_FAILURE:
            return {
                loading: false,
                error: ''
            };

        default:
            return state
    }
}
