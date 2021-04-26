const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DrawGroup = new Schema (
    {
        name        : {type: String,required :true},
        contactIds   : {type: String,required :false},
        shortCode   : {type: String,required :false},
        addedBy     : {type: Number,required :false},
        addedDate   : {type: String,required :false},
        updatedBy   : {type: Number,required :false},
        updatedDate : {type: String,required :false},
    },
    {timestamp : true}  
);

module.exports = mongoose.model('draw_group', DrawGroup,'draw_group');