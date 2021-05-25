import { all } from "redux-saga/effects";
import customers from "./customer";
import customergroup from "./customergroup";
import interval from "./interval";
import amtcatalogue from "./amtcatalogue";
import auction from "./auction";
import drawlog from "./drawlog";
import drawtransaction from "./drawtransaction";
import invoice from "./invoice";
import payment from "./payment";
import record_transaction from "./recordtransaction";


export default function* rootSaga() {

  yield all([
    ...customers,
    ...customergroup,
    ...interval,
    ...amtcatalogue,
    ...auction, 
    ...drawlog,
    ...drawtransaction, 
    ...invoice, 
    ...payment,
    ...record_transaction
  ]);
}
