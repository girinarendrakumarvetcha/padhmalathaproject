const Record_transaction_master = require('../models/record_transaction_master-model.js');

createRecordTransaction = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a contact'   
        })
    }
    const req_obj = {};
    req_obj['name']         = body.im_name;
    req_obj['interval']     = body.im_interval;
    req_obj['shortCode']    = body.im_short_code;
    req_obj['addedBy']      = 1;
    req_obj['addedDate']    = new Date();
    
    const installment_interval = new Record_transaction_master(req_obj);
    if(!installment_interval){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    installment_interval.save(function(err,result){
        const statuscode = (err)?400:200;   
        return res.status(statuscode).json({
            err,
            result,
            message: 'Contact created successfully.'
        });
    });
} 
updateRecordTransaction = async (req,res) => {
    const body = req.body;
    console.log(body);
    console.log(req.params);
    //console.log(req.params["id"]);
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a interval data to update'
        })
    }
    Record_transaction_master.findOne({_id : req.params.id},(err,installment_interval) => {
        if(err){
            return res.status(400).json({err,message : 'update not found..!'});
        }
        installment_interval.name  = body.im_name,
        installment_interval.interval  = body.im_interval,
        installment_interval.shortCode  = body.im_short_code,       
        installment_interval.updatedBy  = 1
        installment_interval.updatedDate  = new Date();
        installment_interval.save(function(err,result){
            const statuscode = (err)?400:200;   
            return res.status(statuscode).json({
                err,
                result,
                message: 'RecordTransaction updated successfully.'
            });
        });
    })
}

getRecordTransactionByCode = async (req, res) => {
    if(req.params.code == ''){
        return 0;
    }
    await Record_transaction_master.findOne({ moduleCode : req.params.code }, (err, transaction_arr) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!transaction_arr) {
            return res
                .status(404)
                .json({ success: false, error: `RecordTransaction details not found` });
        }
        return res
                .status(200)
                .json({ success: true, data : {short_code : (transaction_arr.prefixCode+(Number(transaction_arr.suffixCode) +1))}});
    }).catch(err => console.log(err))
}

getRecordTransactionByValue = async (code) => {
    let record_short_code  = '';
    record_short_code  = await Record_transaction_master.findOne({ moduleCode : code }, (err, transaction_arr) => {
        
        // if (err) {
        //     return res.status(400).json({ success: false, error: err })
        // }
        
        // if (!transaction_arr) {
        //     return res
        //     .status(404)
        //     .json({ success: false, error: `RecordTransaction details not found` });
        // }
        //console.log(transaction_arr);
       return (transaction_arr.prefixCode+(Number(transaction_arr.suffixCode) +1));
    });
    console.log(record_short_code);
    return record_short_code;
}



module.exports = {
    createRecordTransaction,
    updateRecordTransaction,
    getRecordTransactionByCode,
    getRecordTransactionByValue
}