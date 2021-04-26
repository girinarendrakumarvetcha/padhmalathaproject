const express = require('express');

const IntervalCtrl = require('../controllers/installment_interval-ctrl');

const router = express.Router();

router.post('/installment_interval_insert', IntervalCtrl.createInterval);
router.put('/installment_interval/update/:id', IntervalCtrl.updateInterval);
router.delete('/installment_interval/:id', IntervalCtrl.deleteInterval);
router.get('/installment_interval/fetch/:id', IntervalCtrl.getIntervalById);
router.get('/installment_interval_list', IntervalCtrl.getInstallmentIntervalList);
router.get('/intervaldropdown', IntervalCtrl.getIntervalDrpdown);

module.exports = router