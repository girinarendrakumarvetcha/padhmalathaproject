const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuctionMasterTrans = new Schema (
    {
        auctionMasterId     : {type: String,required :true},
        installmentStepNo   : {type: Number,required :false},
        receivableAmount    : {type: Number,required :false},
        payableAmount       : {type: Number,required :false},
        addedBy             : {type: Number,required :false},
        addedDate           : {type: String,required :false},
        updatedBy           : {type: Number,required :false},
        updatedDate         : {type: String,required :false},
        status              : {type: String,required :false}
    },
    {timestamp : true}  
);

module.exports = mongoose.model('auction_master_trans', AuctionMasterTrans,'auction_master_trans');