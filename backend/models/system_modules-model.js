const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SystemModules = new Schema (
    {
        name        : {type: String,required :true},
        displayname : {type: String,required :true},
        shortcode   : {type: String,required :true},
        tablename   : {type: String,required :true},
        url         : {type: String,required :true},
        codelogic  :  {type: String,required :true},
        addedBy  : {type: Number,required :false},
        addedDate : {type: String,required :false},
        updatedBy  : {type: Number,required :false},
        updatedDate : {type: String,required :false},
        
        
        
    },
    {timestamp : true}  
);

module.exports = mongoose.model('system_modules', SystemModules,'system_modules');