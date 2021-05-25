import { recordTransactionConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    dropdown_data: [],
    rec_trans : {'short_code' : '--'},
    error: ''
}
export function recordtrasnaction(state = initialState, action) {

    switch (action.type) {
        case recordTransactionConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                rec_trans : {'short_code' : '--'},
                error: ''
            };

        case recordTransactionConstants.GET_CODE_REQUEST:
            return {
                ...state,
                loading: true,
                rec_trans : {'short_code' : '--'},
                error: ''
            };
        case recordTransactionConstants.GET_CODE_SUCCESS:
            return {
                ...state,
                rec_trans : action.data.data,
                loading: false,
                error: ''
            };
        case recordTransactionConstants.GET_CODE_FAILURE:
            return {
                loading: false,
                rec_trans : {'short_code' : '--'},
                error: ''
            };

        default:
            return state
    }
}
