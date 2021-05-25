const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DrawMaster = new Schema (
    {
        name                : {type: String,required :true},
        printName           : {type: String,required :false},
        auctionMasterId     : {type: String,required :false},
        shortCode           : {type: String,required :false},
        contactCount        : {type: String,required :false},
        drawDate            : {type: String,required :false},
        drawGroupId         : {type: String,required :false},
        ConductedBy         : {type: String,required :false},
        isVariableBonus     : {type: String,required :false},
        amtCatalogueId      : {type: String,required :false},
        drawAmount          : {type: String,required :false},
        drawInstallments    : {type: Number,required :false},
        definedInstallments : {type: Number,required :false},
        intervalCycle       : {type: String,required :false},
        intervalDays        : {type: Number,required :false},
        commissionAmt       : {type: Number,required :false},
        totalComAmt         : {type: Number,required :false},
        installmentAmt      : {type: Number,required :false},
        beforeWithDraw      : {type: Number,required :false},
        afterWithDraw       : {type: Number,required :false},
        bonusAmount         : {type: Number,required :false},
        uniqueCode          : {type: String,required :false},
        addedBy             : {type: Number,required :false},
        addedDate           : {type: String,required :false},
        updatedBy           : {type: Number,required :false},
        updatedDate         : {type: String,required :false},
        status              : {type: String,required :false},
        transactionData : [{
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

module.exports = mongoose.model('draw_master', DrawMaster,'draw_master');