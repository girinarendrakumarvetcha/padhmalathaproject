const express = require('express');

const DrawMasterTransCtrl = require('../controllers/draw_master_trans-ctrl');

const router = express.Router();

router.get('/draw_master_trans/list/:id', DrawMasterTransCtrl.getDrawMasterTransList);
router.post('/draw_master_trans/add', DrawMasterTransCtrl.createDrawMasterTrans);
router.post('/draw_master_trans/update/:id', DrawMasterTransCtrl.updateDrawMasterTrans);
router.get('/draw_master_trans/fetch/:id', DrawMasterTransCtrl.getDrawMasterTransDataById);

module.exports = router;