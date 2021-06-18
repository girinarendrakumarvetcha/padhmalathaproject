import React , { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/base.css';
import '../assets/developer.css';
import modulelist from '../modules';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from "../config/routes";
import AppHeader from '../Layout/AppHeader/';
import AppSidebar from '../Layout/AppSidebar/';
import AppFooter from '../Layout/AppFooter/';

function App() {
  return (
    <Router>
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">                 
                    <Switch>
                        <Route path={`${routes.INTERVAL_LIST}`} exact component={modulelist.InstallmentIntervalList} />
                        <Route path={`${routes.INTERVAL_ADD}`} exact component={modulelist.InstallmentIntervalInsert} />
                        <Route path={`${routes.INTERVAL_UPDATE}`} exact component={modulelist.InstallmentIntervalInsert} /> 
                        <Route path={`${routes.AMOUNT_CATALOG_LIST}`} exact component={modulelist.AmountCatalogList} />
                        <Route path={`${routes.AMOUNT_CATALOG_ADD}`} exact component={modulelist.AmountCatalogInsert} />
                        <Route path={`${routes.AMOUNT_CATALOG_UPDATE}`} exact component={modulelist.AmountCatalogInsert} /> 
                        <Route path={`${routes.CUSTOMER_LIST}`} exact component={modulelist.CustomerList} />
                        <Route path={`${routes.CUSTOMER_ADD}`} exact component={modulelist.CustomerInsert} />
                        <Route path={`${routes.CUSTOMER_UPDATE}`} exact component={modulelist.CustomerInsert} />
                        <Route path={`${routes.CHIT_MASTER_LIST}`} exact component={modulelist.AuctionList} />
                        <Route path={`${routes.CHIT_MASTER_ADD}`} exact component={modulelist.AuctionInsert} />
                        <Route path={`${routes.CHIT_MASTER_UPDATE}`} exact component={modulelist.AuctionInsert} />
                        <Route path={`${routes.CUSTOMER_GROUP_LIST}`} exact component={modulelist.CustomerGroupList} />
                        <Route path={`${routes.CUSTOMER_GROUP_ADD}`} exact component={modulelist.CustomerGroupInsert} />
                        <Route path={`${routes.CUSTOMER_GROUP_UPDATE}`} exact component={modulelist.CustomerGroupInsert} />
                        <Route path={`${routes.DRAW_MASTER_LIST}`} exact component={modulelist.DrawLogList} />
                        <Route path={`${routes.DRAW_MASTER_ADD}`} exact component={modulelist.DrawLogInsert} /> 
                        <Route path={`${routes.DRAW_MASTER_UPDATE}`} exact component={modulelist.DrawLogInsert} /> 
                        <Route path={`${routes.DRAW_INVOICE_UPDATE}`} exact component={modulelist.DrawInvoiceInsert} /> 
                        <Route path={`${routes.DRAW_INVOICE_LIST}`} exact component={modulelist.DrawInvoiceList} />
                        <Route path={`${routes.DRAW_INVOICE_PAYMENT_LIST}`} exact component={modulelist.DrawInvoicePaymentList} />
                        <Route path={`${routes.DRAW_INVOICE_PAYMENT_ADD_URL}`} exact component={modulelist.DrawInvoicePaymentInsert} />
                        <Route path={`${routes.DRAW_MASTER_TRANS_LIST}`} exact component={modulelist.DrawTransactionList} />
                        <Route path={`${routes.DRAW_MASTER_TRANS_ADD}`} exact component={modulelist.DrawTransactionInsert} />
                        <Route path={`${routes.DRAW_MASTER_TRANS_UPDATE}`} exact component={modulelist.DrawTransactionInsert} />
                        <Route path={`${routes.SITE_PAGE_LIST}`} exact component={modulelist.SitePageList} />
                        {/* <Route path={`${routes.CUSTOMER_GROUP_ADD}`} exact component={modulelist.CustomerGroupInsert} /> */}
                     </Switch>
                </div>      
            </div>
            <AppFooter/>
        </div>
    </Fragment>
    </Router>
        );
}

export default App;



// import { HashRouter } from 'react-router-dom';
// import './assets/base.css';
// import Main from './DemoPages/Main';
// import configureStore from './config/configureStore';
// import { Provider } from 'react-redux';

// const store = configureStore();
// const rootElement = document.getElementById('root');

// const renderApp = Component => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <HashRouter>
//         <Component />
//       </HashRouter>
//     </Provider>,
//     rootElement
//   );
// };

// renderApp(Main);

// if (module.hot) {
//   module.hot.accept('./DemoPages/Main', () => {
//     const NextApp = require('./DemoPages/Main').default;
//     renderApp(NextApp);
//   });
// }
// unregister();

// // registerServiceWorker();

