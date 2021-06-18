import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:8080/api',
    baseURL: 'http://'+window.location.hostname+':8080/api',
    //baseURL: 'http://192.168.1.2:8080/api',
});

const insertCustomer     = payload => api.post(`/customer`, payload);
const getAllCustomers    = () => api.get(`/customers`);
const deleteCustomerById = id => api.delete(`/customer/${id}`);
const getCustomerById    = id => api.get(`/customer/${id}`);
const insertAuctionDetails      = payload => api.post(`/auction`, payload);
const getAuctionList     = () => api.get(`/auctionlist`);
const getAmtCatalogList  = () => api.get(`/amtcataloglist`);
const insertAmtCatalog   = payload => api.post(`/amt_catalog_insert`,payload);
const getIntervalList  = () => api.get(`/installment_interval_list`);
const insertInterval   = payload => api.post(`/installment_interval_insert`,payload);
const getCustomerGroupList  = () => api.get(`/draw_group_list`);
const insertCustomerGroup   = payload => api.post(`/draw_group_insert`,payload);
const updateCustomerGroupById   = (id,payload) => api.put(`/draw_group/update/${id}`,payload);
const getDrawList  = () => api.get(`/drawlist`);
const insertDrawLog   = payload => api.post(`/draw`,payload);
const intervalRecordFetch    = id => api.get(`/installment_interval/fetch/${id}`);
const amtCatalogueRecordFetch    = id => api.get(`/amt_catalog/fetch/${id}`);
const customerRecordFetch    = id => api.get(`/customer/fetch/${id}`);
const customerGroupRecordFetch    = id => api.get(`/draw_group/fetch/${id}`);
const auctionRecordFetch    = id => api.get(`/auction/fetch/${id}`);
const auctionDetailsFetch    = id => api.get(`auction/draw/fetch/${id}`);
const customerDropdown       = () => api.get(`/customerdrpdwn`);
const amtCatalogueDropdown   = () => api.get(`/amtcatalogdropdown`);
const intervalDropdown       = () => api.get(`/intervaldropdown`);
const drawGroupDropdown       = () => api.get(`/draw_group_dropdown`);
const auctionDropdown       = () => api.get(`/auctiondropdown`);
const getDrawInvoiceList = id => api.get(`/draw_invoice_list/index/${id}`);
const updateIntervalById = (id, payload) => api.put(`/installment_interval/update/${id}`, payload);
const updateAmtCatalogueById = (id, payload) => api.put(`/amt_catalog/update/${id}`, payload);
const updateCustomerById = (id, payload) => api.put(`/customer/update/${id}`, payload);
const updateDrawGroupById = (id, payload) => api.put(`/draw_group/update/${id}`, payload);
const updateAuctionDetails = (id, payload) => api.put(`/auction/update/${id}`, payload);
//const getAuctionDetailsById = (id, payload) => api.get(`/auctoion_details/${id}`, payload);
const getAuctionDetailsById = (id, payload) => api.get(`/auction/fetch/${id}`, payload);
const getDrawInvoiceById = (id, payload) => api.get(`/draw_invoice/${id}`, payload);
const updateDrawInvoiceById = (id, payload) => api.put(`/draw_invoice/update/${id}`, payload);
const drawlogRecordFetch = (id) => api.get(`/draw_master/fetch/${id}`);
const drawInvoiceRecordFetch = (id) => api.get(`/draw_invoice/fetch/${id}`);
const drawInvoicePaymentList = (id) => api.get(`/draw_invoice/list/${id}`);
const drawInvoicePaymentFetch = (id) => api.get(`/draw_invoice_payment/fetch/${id}`);
const insertDrawInvoicePayment = (payload) => api.post(`/draw_invoice_payment/add`,payload);
const getDrawInvoicePaymentList = (id) => api.get(`/draw_invoice_payment/list/${id}`);
const updateDrawInvoicePaymentById = (id, payload) => api.put(`/draw_invoice_payment/update/${id}`, payload);
const drawTransactionRecordFetch = (id) => api.get(`/draw_master_trans/fetch/${id}`);
const insertDrawMasterTrans = (payload) => api.post(`/draw_master_trans/add`,payload);
const getDrawMasterTransList = (id) => api.get(`/draw_master_trans/list/${id}`);
const updateDrawTransactionById = (id, payload) => api.put(`/draw_master_trans/update/${id}`, payload);
const getRecordTransactionCode = (code) => api.get(`/getrecordcode/${code}`);
const getSitePageSearch = (payload) => api.get(`/site_page/search/${payload}`);
const apis = {
    insertCustomer,
    getAllCustomers,
    updateCustomerById,
    getCustomerById,
    deleteCustomerById,
    insertAuctionDetails,
    getAuctionList,
    getAmtCatalogList,
    insertAmtCatalog,
    getIntervalList,
    insertInterval,
    getCustomerGroupList,
    insertCustomerGroup,
    getDrawList,
    insertDrawLog,
    intervalRecordFetch,
    customerDropdown,
    amtCatalogueDropdown,
    intervalDropdown,
    drawGroupDropdown,
    auctionDropdown,
    updateIntervalById,
    updateAmtCatalogueById,
    amtCatalogueRecordFetch,
    customerRecordFetch ,
    customerGroupRecordFetch,
    auctionRecordFetch,
    updateAuctionDetails,
    getAuctionDetailsById,
    getDrawInvoiceList,
    updateDrawGroupById,
    getDrawInvoiceById,
    updateDrawInvoiceById,
    drawInvoiceRecordFetch,
    updateCustomerGroupById,
    drawlogRecordFetch,
    drawInvoicePaymentList,
    drawInvoicePaymentFetch,
    insertDrawInvoicePayment,
    getDrawInvoicePaymentList,
    updateDrawInvoicePaymentById,
    drawTransactionRecordFetch,
    insertDrawMasterTrans,
    getDrawMasterTransList,
    updateDrawTransactionById,
    getRecordTransactionCode,
    auctionDetailsFetch,
    getSitePageSearch
}

export default apis;
