import ThemeOptions from './ThemeOptions';
import { customer } from './customer.reducer';
import { customergroup } from './customergroup.reducer';
import { interval } from './interval.reducer';
import { amtcatalogue } from './amtcatalogue.reducer';
import { auction } from './auction.reducer';
import { drawlog } from './drawlog.reducer';
import { drawtransaction } from './drawtransaction.reducer';
import { invoice } from './invoice.reducer';

import customdropdown from './customdropdown.reducer';

import { payment } from './payment.reducer';
import { recordtrasnaction } from './recordtrasnaction.reducer';
import { combineReducers } from "redux";

const reducers = {
    ThemeOptions,
    customer, customergroup, interval, amtcatalogue, auction, drawlog, drawtransaction, invoice,payment,recordtrasnaction,
    customdropdown
};

export default reducers;

// export default combineReducers({
//     ThemeOptions,
//     customer
// });
