
import CustomerList from './customer/List'
import CustomerInsert from './customer/Insert'
import CustomerUpdate from '../pages/CustomerUpdate'

import AuctionList from './auction/List'
import AuctionInsert from './auction/Insert'

import AmountCatalogList from './amtCatalogue/List'
import AmountCatalogInsert from './amtCatalogue/Insert'

import InstallmentIntervalList from './interval/List'
import InstallmentIntervalInsert from './interval/Insert'

import DrawInvoiceList from './invoice/List'
import DrawInvoiceInsert from './invoice/Insert'

import DrawTransactionList from './drawtransaction/List'
import DrawTransactionInsert from './drawtransaction/Insert'

import DrawInvoicePaymentList from './payment/List'
import DrawInvoicePaymentInsert from './payment/Insert'

import CustomerGroupList from './customergroup/List'
import CustomerGroupInsert from './customergroup/Insert'
import DrawLogList from './drawlog/List'
import DrawLogInsert from './drawlog/Insert';
import SitePageList from './sitepage/List';

import SampleForm from '../pages/redux_form_sample'

const modulelist  =  {    CustomerList, 
            CustomerInsert,
            CustomerUpdate,
            AuctionList,
            AuctionInsert,
            AmountCatalogList,
            AmountCatalogInsert,
            InstallmentIntervalList,
            InstallmentIntervalInsert,
            CustomerGroupInsert,
            CustomerGroupList,
            DrawLogList,
            DrawLogInsert,
            DrawInvoiceList,
            DrawInvoiceInsert,
            DrawInvoicePaymentList,
            DrawInvoicePaymentInsert,
            DrawTransactionList,
            DrawTransactionInsert,
            SitePageList
        };

export default modulelist;