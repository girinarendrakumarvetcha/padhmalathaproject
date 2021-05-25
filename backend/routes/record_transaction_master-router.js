const express = require('express');

const recordTransactionMasterCtrl = require('../controllers/record_transaction_master-ctrl');

const router = express.Router();

router.get('/getrecordcode/:code', recordTransactionMasterCtrl.getRecordTransactionByCode);

module.exports = router