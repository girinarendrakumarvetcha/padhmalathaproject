
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

import DrawMasterTransList from './drawmastertrans/List'
import DrawMasterTransInsert from './drawmastertrans/Insert'

import DrawInvoicePaymentList from './payment/List'
import DrawInvoicePaymentInsert from './payment/Insert'

import DrawGroupList from './drawgroup/List'
import DrawGroupInsert from './drawgroup/Insert'
import DrawLogList from './drawlog/List'
import DrawLogInsert from './drawlog/Insert'
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
            DrawGroupInsert,
            DrawGroupList,
            DrawLogList,
            DrawLogInsert,
            DrawInvoiceList,
            DrawInvoiceInsert,
            DrawInvoicePaymentList,
            DrawInvoicePaymentInsert,
            DrawMasterTransList,
            DrawMasterTransInsert
        };

export default modulelist;