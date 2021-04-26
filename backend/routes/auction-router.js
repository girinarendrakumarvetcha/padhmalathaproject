const express = require('express');

const AuctionCtrl = require('../controllers/master_auction-ctrl');

const router = express.Router();

router.post('/auction', AuctionCtrl.createAuction);
router.get('/auctionlist', AuctionCtrl.getAuctionList);
router.get('/auctiondropdown', AuctionCtrl.getAuctionDrpdwn);
router.get('/auction/fetch/:id', AuctionCtrl.getAuctionById);
router.put('/auction/update/:id', AuctionCtrl.updateAuction);
// router.delete('/customer/:id', AuctionCtrl.deleteContact);
// router.get('/customer/:id', AuctionCtrl.getContactById);

module.exports = router