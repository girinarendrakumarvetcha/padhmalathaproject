export const BASE_URL = "/";
export const routes = {
  BASEPATH: BASE_URL,
  AMOUNT_CATALOG_LIST:`${BASE_URL}amt_catalog/index`,
  AMOUNT_CATALOG_ADD:`${BASE_URL}amt_catalog/add`,
  AMOUNT_CATALOG_UPDATE:`${BASE_URL}amt_catalog/update/:id`,
  AMOUNT_CATALOG_EDIT:`${BASE_URL}amt_catalog/update`,
  CUSTOMER_LIST:`${BASE_URL}customer/index`,
  CUSTOMER_ADD:`${BASE_URL}customer/add`,
  CUSTOMER_UPDATE:`${BASE_URL}customer/update/:id`,
  CUSTOMER_EDIT:`${BASE_URL}customer/update`,
  CHIT_MASTER_LIST:`${BASE_URL}auction/index`,
  CHIT_MASTER_ADD:`${BASE_URL}auction/add`,
  CHIT_MASTER_UPDATE:`${BASE_URL}auction/update/:id`,
  CHIT_MASTER_EDIT:`${BASE_URL}auction/update`,
  INTERVAL_LIST:`${BASE_URL}installment_interval/index` ,
  INTERVAL_ADD:`${BASE_URL}installment_interval/add` ,  
  INTERVAL_UPDATE:`${BASE_URL}installment_interval/update/:id` , 
  INTERVAL_EDIT :`${BASE_URL}installment_interval/update` , 
  DRAW_GROUP_LIST:`${BASE_URL}draw_group/index` ,
  DRAW_GROUP_ADD:`${BASE_URL}draw_group/add` ,
  DRAW_GROUP_UPDATE:`${BASE_URL}draw_group/update/:id` ,
  DRAW_GROUP_EDIT:`${BASE_URL}draw_group/update` ,
  DRAW_MASTER_LIST:`${BASE_URL}draw_master/index` ,
  DRAW_MASTER_ADD:`${BASE_URL}draw_master/add` ,
  DRAW_MASTER_UPDATE:`${BASE_URL}draw_master/update/:id` ,
  DRAW_MASTER_EDIT:`${BASE_URL}draw_master/update` ,
  DRAW_INVOICE_LIST:`${BASE_URL}draw_invoice_list/index/:id` ,
  DRAW_INVOICE_LIST_URL:`${BASE_URL}draw_invoice_list/index` ,
  DRAW_INVOICE_UPDATE:`${BASE_URL}draw_invoice/update/:id` ,
  DRAW_INVOICE_EDIT:`${BASE_URL}draw_invoice/update`, 
  
  DRAW_INVOICE_PAYMENT_LIST:`${BASE_URL}draw_invoice_payment/list/:id` ,
  DRAW_INVOICE_PAYMENT_LIST_URL:`${BASE_URL}draw_invoice_payment/list` ,
  DRAW_INVOICE_PAYMENT_ADD:`${BASE_URL}draw_invoice_payment/add` ,
  DRAW_INVOICE_PAYMENT_ADD_URL:`${BASE_URL}draw_invoice_payment/add/:id` ,
  DRAW_INVOICE_PAYMENT_UPDATE:`${BASE_URL}draw_invoice_payment/update/:id` ,
  DRAW_INVOICE_PAYMENT_EDIT:`${BASE_URL}draw_invoice_payment/update`, 
  
  DRAW_MASTER_TRANS_LIST:`${BASE_URL}draw_master_trans/list/:id` ,
  DRAW_MASTER_TRANS_LIST_URL:`${BASE_URL}draw_master_trans/list` ,
  DRAW_MASTER_TRANS_ADD:`${BASE_URL}draw_master_trans/add` ,
  DRAW_MASTER_TRANS_ADD_URL:`${BASE_URL}draw_master_trans/add/:id` ,
  DRAW_MASTER_TRANS_UPDATE:`${BASE_URL}draw_master_trans/update/:id` ,
  DRAW_MASTER_TRANS_EDIT:`${BASE_URL}draw_master_trans/update`, 
};
