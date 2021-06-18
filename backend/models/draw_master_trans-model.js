const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DrawMasterTrans = new Schema (
    {
        drawMasterId        : {type: String,required :false},
        contactMasterId     : {type: String,required :false},
        drawBookCode        : {type: String,required :false},
        installmentStepNo   : {type: Number,required :false},
        actualWithdrawDate  : {type: String,required :false},
        withdrawDate        : {type: String,required :false},
        isWithdrawed        : {type: String,required :false},
        receivableAmount    : {type: Number,required :false},
        commissionAmount    : {type: Number,required :false},
        payableAmount       : {type: Number,required :false},
        AddedBy             : {type: Number,required :false},
        AddedDate           : {type: String,required :false},
        UpdatedBy           : {type: Number,required :false},
        UpdatedDate         : {type: String,required :false},
        Status              : {type: String,required :false}
    },
    {timestamp : false}  
);

module.exports = mongoose.model('draw_master_trans', DrawMasterTrans,'draw_master_trans');