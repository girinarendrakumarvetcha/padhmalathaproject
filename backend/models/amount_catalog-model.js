const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CatalogMaster = new Schema (
    {
        name        : {type: String,required :true},
        amount      : {type: Number,required :true},
        shortCode   : {type: String,required :false},
        addedBy     : {type: Number,required :false},
        addedDate   : {type: String,required :false},
        updatedBy   : {type: Number,required :false},
        updatedDate : {type: String,required :false},
    },
    {timestamp : true}  
);

module.exports = mongoose.model('catalog_master', CatalogMaster,'catalog_master');