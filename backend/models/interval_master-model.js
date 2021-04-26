const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IntervalMaster = new Schema (
    {
        name        : {type: String,required :true},
        interval    : {type: Number,required :true},
        shortCode   : {type: String,required :true},
        addedBy     : {type: Number,required :false},
        addedDate   : {type: String,required :false},
        updatedBy   : {type: Number,required :false},
        updatedDate : {type: String,required :false},
    },
    {timestamp : true}  
);

module.exports = mongoose.model('interval_master', IntervalMaster,'interval_master');