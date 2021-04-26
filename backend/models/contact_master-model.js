const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Contactmaster = new Schema (
    {
        name   : {type: String,required :true},
        email  : {type: String,required :true},
        phone  : {type: Number,required :false},
        address : {type: String,required :false},
        whatsapp  : {type: Number,required :false},
        address  : {type: String,required :false},
        addedBy  : {type: Number,required :false},
        addedDate : {type: String,required :false},
        updatedBy  : {type: Number,required :false},
        updatedDate : {type: String,required :false},
    },
    {timestamp : true}  
);

module.exports = mongoose.model('contact_master', Contactmaster,'contact_master');