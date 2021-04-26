const express = require('express');

const DrawInvoiceCtrl = require('../controllers/draw_invoice-ctrl');

const router = express.Router();

//router.post('/draw', DrawInvoiceCtrl.createDrawInvoice);
router.get('/draw_invoice_list/index/:id', DrawInvoiceCtrl.getDrawInvoiceList);
//router.get('/auctoion_details/:id', DrawInvoiceCtrl.getAuctionDataById);

// router.put('/customer/:id', DrawInvoiceCtrl.updateContact);
// router.delete('/customer/:id', DrawInvoiceCtrl.deleteContact);
// router.get('/customer/:id', DrawInvoiceCtrl.getContactById);
router.put('/draw_invoice/update/:id', DrawInvoiceCtrl.updateDrawInvoiceById);
router.get('/draw_invoice/fetch/:id', DrawInvoiceCtrl.getDrawInvoiceDataById);

module.exports = router