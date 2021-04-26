const express = require('express');

const DrawInvoicePaymentCtrl = require('../controllers/draw_invoice_payment-ctrl');

const router = express.Router();

router.get('/draw_invoice_payment/list/:id', DrawInvoicePaymentCtrl.getDrawInvoicePaymentList);
router.post('/draw_invoice_payment/add', DrawInvoicePaymentCtrl.createDrawInvoicePayment);
router.post('/draw_invoice_payment/update/:id', DrawInvoicePaymentCtrl.updateDrawInvoicePayment);
router.get('/draw_invoice_payment/fetch/:id', DrawInvoicePaymentCtrl.getDrawInvoicePaymentDataById);

module.exports = router