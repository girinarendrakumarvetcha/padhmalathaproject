const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuctionMaster = new Schema (
    {
        name            : {type: String,required :true},
        printName       : {type: String,required :false},
        amtCatlogId     : {type: String,required :false},
        totalAmount     : {type: String,required :false},
        installments    : {type: Number,required :false},
        intervalCycle   : {type: String,required :false},
        intervalDays    : {type: Number,required :false},
        commissionAmt   : {type: Number,required :false},
        totalComAmt     : {type: Number,required :false},
        installmentAmt  : {type: Number,required :false},
        beforeWithDraw  : {type: Number,required :false},
        afterWithDraw   : {type: Number,required :false},
        bonusAmount     : {type: Number,required :false},
        isVariableAmt   : {type: String,required :false},
        shortCode       : {type: String,required :false},
        uniqueCode      : {type: String,required :false},
        addedBy         : {type: Number,required :false},
        addedDate       : {type: String,required :false},
        updatedBy       : {type: Number,required :false},
        updatedDate     : {type: String,required :false},
        status          : {type: String,required :false},
        transactionData : [{
            //auctionMasterId     : {type: String,required :false},
            installmentStepNo   : {type: Number,required :false},
            receivableAmount    : {type: Number,required :false},
            payableAmount       : {type: Number,required :false},
            addedBy             : {type: Number,required :false},
            addedDate           : {type: String,required :false},
            updatedBy           : {type: Number,required :false},
            updatedDate         : {type: String,required :false},
            status              : {type: String,required :false}}]
    },
    {timestamp : true}  
);

module.exports = mongoose.model('auction_master', AuctionMaster,'auction_master');