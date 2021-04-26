const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DrawInvoicePayment = new Schema (
    {
        drawInvoiceId       : {type: String,required :true},
        paymentAmount       : {type: Number,required :false},
        paymentDate         : {type: String,required :false},
        shortCode           : {type: String,required :false},
        allocatedDraw       : {type: String,required :false},
        addedBy             : {type: Number,required :false},
        addedDate           : {type: String,required :false},
        updatedBy           : {type: Number,required :false},
        updatedDate         : {type: String,required :false}
    },
    {timestamp : true}  
);
module.exports = mongoose.model('draw_invoice_payment', DrawInvoicePayment,'draw_invoice_payment');