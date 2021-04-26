const express = require('express');

const DrawGroupCtrl = require('../controllers/draw_group-ctrl');

const router = express.Router();

router.post('/draw_group_insert', DrawGroupCtrl.createDrawGroup);
router.put('/draw_group/update/:id', DrawGroupCtrl.updateDrawGroup);
router.delete('/draw_group/:id', DrawGroupCtrl.deleteDrawGroup);
router.get('/draw_group/:id', DrawGroupCtrl.getDrawGroupById);
router.get('/draw_group/fetch/:id', DrawGroupCtrl.getDrawGroupById);
router.get('/draw_group_list', DrawGroupCtrl.getDrawGroupList);
router.get('/draw_group_dropdown', DrawGroupCtrl.getDrawGroupDrpdwn);

module.exports = router