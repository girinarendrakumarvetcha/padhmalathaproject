const express = require('express');

const DrawCtrl = require('../controllers/draw_master-ctrl');

const router = express.Router();

router.post('/draw', DrawCtrl.createDraw);
router.get('/drawlist', DrawCtrl.getDrawList);
router.put('/draw_master/update/:id', DrawCtrl.updateDraw);
router.get('/draw_master/fetch/:id', DrawCtrl.getDrawDataById);

// router.put('/customer/:id', DrawCtrl.updateContact);
// router.delete('/customer/:id', DrawCtrl.deleteContact);
// router.get('/customer/:id', DrawCtrl.getContactById);

module.exports = router