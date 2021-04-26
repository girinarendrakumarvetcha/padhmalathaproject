import ThemeOptions from './ThemeOptions';
import { customer } from './customer.reducer';
import { combineReducers } from "redux";

const reducers = {
    ThemeOptions,
    customer
};

export default reducers;

// export default combineReducers({
//     ThemeOptions,
//     customer
// });
