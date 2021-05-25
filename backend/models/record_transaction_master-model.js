const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecordTransactionMaster = new Schema (
    {
        moduleCode        : {type: String,required :true},
        prefixCode        : {type: String,required :true},
        suffixCode        : {type: String,required :true}
    },
    {timestamp : true}  
);

module.exports = mongoose.model('record_transaction_master', RecordTransactionMaster,'record_transaction_master');