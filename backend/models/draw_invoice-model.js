const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DrawInvoice = new Schema (
    {
        drawMasterId        : {type: String,required :true},
        drawMasterTransId   : {type: String,required :true},
        contactMasterId     : {type: String,required :true},
        installmentStepNo   : {type: Number,required :false},
        beforePayableAmount : {type: Number,required :false},
        afterPayableAmount  : {type: Number,required :false},
        bonusAmount         : {type: Number,required :false},
        payableAmount       : {type: Number,required :false},
        paymentStatus       : {type: String,required :false},
        paymentDate         : {type: String,required :false},
        paidDate            : {type: String,required :false},
        paidAmount          : {type: Number,required :false},
        addedBy             : {type: Number,required :false},
        addedDate           : {type: String,required :false},
        updatedBy           : {type: Number,required :false},
        updatedDate         : {type: String,required :false},
        status              : {type: String,required :false}
    },
    {timestamp : true}  
);

module.exports = mongoose.model('draw_invoice', DrawInvoice,'draw_invoice');