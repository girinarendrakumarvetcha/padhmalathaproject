import { customerConstants } from '../constants';
const initialState = {
    loading: false,
    form_data: [],
    list_data: [],
    error: ''
}
export function customer(state = initialState, action) {

    switch (action.type) {
        case customerConstants.RESET_DETAILS:
            return {
                loading: false,
                form_data: [],
                list_data: [],
                error: ''
            };

        case customerConstants.GET_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                form_data: [],
                error: ''
            };
        case customerConstants.GET_FORM_SUCCESS:
            return {
                ...state,
                form_data: action.data.data,
                loading: false,
                error: ''
            };
        case customerConstants.GET_FORM_FAILURE:
            return {
                loading: false,
                form_data: [],
                error: ''
            };
        
        case customerConstants.GET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                list_data : [],
                error: ''
            };
        case customerConstants.GET_LIST_SUCCESS:
         console.log({
            ...state,
            list_data: action.data.data,
            loading: false,
            error: ''
        });
        
        return {
                ...state,
                list_data: action.data.data,
                loading: false,
                error: ''
            };
        case customerConstants.GET_LIST_FAILURE:
            return {
                loading: false,
                list_data: [],
                error: action.error
            };


        case customerConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case customerConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case customerConstants.DELETE_FAILURE:

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