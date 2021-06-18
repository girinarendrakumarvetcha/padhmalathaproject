const Draw_master_trans = require('../models/draw_master_trans-model.js');
const Draw_master = require('../models/draw_master-model.js');
const Draw_invoice = require('../models/draw_invoice-model.js');
//const Draw_invoice_controller = require('../models/draw_invoice-ctrl.js');
const moment = require('moment');

getDrawMasterTransList = async (req, res) => {

    Draw_master_trans.aggregate([
        {
            $match: { drawMasterId: req.params.id }
        },
        {
            $addFields: {
                contactMasterId: { $toObjectId: "$contactMasterId" }
            }
        },
        {
            $lookup:
            {
                from: "contact_master",
                localField: "contactMasterId",
                foreignField: "_id",
                as: "customer_details"
            }
        }
    ]).exec((err, dwt_data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        console.log(dwt_data);
        if (!dwt_data) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        const ret_arr = [];


        for (let data of dwt_data) {
            console.log(data['customer_details']);
            const dummy_arr = {};
            dummy_arr['dwt_id'] = data['_id'];
            dummy_arr['dwt_draw_master_id'] = data['drawMasterId'];
            dummy_arr['dwt_draw_book_code'] = data['drawBookCode'];
            dummy_arr['dwt_customer_name'] = data['customer_details'][0]['name'];
            dummy_arr['dwt_is_withdrawed'] = data['isWithdrawed'];
            dummy_arr['dwt_receivable_amount'] = data['receivableAmount'];
            dummy_arr['dwt_payable_amount'] = data['payableAmount'];
            ret_arr.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: ret_arr })
    })

}
createDrawMasterTrans = async (req, res) => {

    const body = req.body;
    if (!body || 1) {
        return res.status(200).json({
            success: true,
            error: 'You cannot Insert..!'
        });
        // return res.status(400).json({
        //     success : false,
        //     error : 'You must provide a some data..!'
        // });
    }
    let req_obj = [];
    req_obj['drawInvoiceId'] = body.dwt_draw_invoice;
    req_obj['paymentAmount'] = body.dwt_payment_amount;
    req_obj['paymentDate'] = body.dwt_payment_date;
    //req_obj['allocatedDraw']  = body.dwt_;
    // req_obj['addedBy']  = body.dwt_;      
    // req_obj['addedDate']  = body.dwt_;    
    // req_obj['updatedBy']  = body.dwt_;    
    // req_obj['updatedDate']  = body.dwt_;
    const draw_master_trans = new Draw_master_trans(req_obj);
    console.log(draw_master_trans);
    draw_master_trans.save(function (err, result) {
        console.log(err);
        const statuscode = (err) ? 400 : 200;
    });
    var req = {};
    req['params'] = {};
    req['params']['id'] = body.dwt_draw_invoice;
    var paind_amt = {};
    paind_amt['paid_amount'] = body.dwt_payment_amount;
    console.log(req.params.id);
    Draw_invoice.findOne({ _id: req.params.id }, (err, di_data) => {
        if (err) {
            return res.status(400).json({ err, message: 'customer not found..!' });
        }
        //console.log(di_data);
        var paid_amount = di_data.paidAmount;
        di_data['paidAmount'] = Number(paid_amount) + Number(paind_amt['paid_amount']);
        di_data['paidDate'] = new Date();
        // console.log(draw_master_trans);
        // console.log(di_data['paidAmount']);
        // console.log(paid_amount + paind_amt['paid_amount']);
        // console.log(paind_amt);
        di_data.save(function (err, result) {
            console.log(err);
            // const statuscode = (err)?400:200;   
            // return res.status(statuscode).json({
            //     err,
            //     result,
            //     message: 'Invoice updated successfully.'
            // });
        });
    });

    // return res.status(200).json({
    //     message: 'Record saved successfully.'
    // });

}
updateDrawMasterTrans = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a details to update'
        })
    }
    
    await Draw_master_trans.findOne({_id : req.params.id}, async (err,dwt_data) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        //console.log(body);
        //console.log(dwt_data);
        if((dwt_data.isWithdrawed == 'No' && body.dwt_is_withdrawed == 'Yes')){
            //drawMasterId
            let draw_master_data = {}; 
            await Draw_master.findOne({ _id: dwt_data.drawMasterId }, async (err, draw_master) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                //console.log(draw_master);
                draw_master_data = draw_master;
                let transaction_data = draw_master_data.transactionData;
                //console.log(transaction_data);
                transaction_data.forEach(function(value){
                    if(value.installmentStepNo == body.dwt_installment_step){
                        dwt_data.installmentStepNo = value.installmentStepNo;
                        dwt_data.receivableAmount = value.receivableAmount;
                        dwt_data.payableAmount = value.payableAmount;
                        dwt_data.isWithdrawed = 'Yes';
                        dwt_data.actualWithdrawDate = body.dwt_actual_withdraw_date;
                        dwt_data.actualWithdrawDate = body.dwt_withdraw_date;
                        dwt_data.save(async function(err,data){                          
                            
                            let match_condition  = {
                                $gt: value.installmentStepNo
                            };
                            if(value.installmentStepNo > 1){
                                match_condition  = {
                                    $gte: value.installmentStepNo
                                };
                            }
                            await Draw_invoice.updateMany({
                                $and: [{
                                    "contactMasterId": body.dwt_contact_id
                                }, {
                                    "installmentStepNo": match_condition
                                }]
                            }, {$set: {'payableAmount': draw_master.afterWithDraw}},(err, writeResult) => {
                                console.log(err);
                                console.log(writeResult);
                            });
                            console.log('invoices updated ');
                            return res.status(200).json({
                                        err,
                                        data,
                                        message: 'Invoices updated successfully.'
                                    });
                        });
                    }
                });
                console.log('complete');
            }).catch(err => console.log(err));
        }
           // di_data.save(function(err,result){
        //     const statuscode = (err)?400:200;   
        //     return res.status(statuscode).json({
        //         err,
        //         result,
        //         message: 'Invoice updated successfully.'
        //     });
        // });
    })
}
getDrawMasterTransDataById = async (req, res) => {
    
    await Draw_master_trans.aggregate([

        {
            $addFields: {
                drawTransactionId: { $toString: "$_id" },
                drawMasterId: { $toObjectId: "$drawMasterId" },
                contactMasterId: { $toObjectId: "$contactMasterId" },
            }
        },
        {
            $match: { drawTransactionId: req.params.id }
        },
        {
            $lookup:
            {
                from: "contact_master",
                localField: "contactMasterId",
                foreignField: "_id",
                as: "customer_details"
            }
        },
        {
            $lookup:
            {
                from: "draw_master",
                localField: "drawMasterId",
                foreignField: "_id",
                as: "draw_master_details"
            }
        },
        { $unwind: '$draw_master_details' },
        { $unwind: '$customer_details' }
    ]).exec((err, dwt_data) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!dwt_data) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        //console.log(dwt_data);
        const ret_arr = {};
        dwt_data = dwt_data[0];
        ret_arr['dwt_id'] = dwt_data['_id'];
        ret_arr['dwt_draw_master_id'] = dwt_data['drawMasterId'];
        ret_arr['dwt_contact_id'] = dwt_data['contactMasterId'];
        ret_arr['dwt_contact_name'] = dwt_data['customer_details']['name'];
        ret_arr['dwt_draw_id'] = dwt_data['drawMasterId'];
        ret_arr['dwt_draw_name'] = dwt_data['draw_master_details']['name'];
        ret_arr['dwt_draw_book_code'] = dwt_data['drawBookCode'];
        ret_arr['dwt_installment_step'] = dwt_data['installmentStepNo'];
        ret_arr['dwt_actual_withdraw_date'] = dwt_data['actualWithdrawDate'];
        ret_arr['dwt_withdraw_date'] = dwt_data['withdrawDate'];
        ret_arr['dwt_is_withdrawed'] = dwt_data['isWithdrawed'];
        ret_arr['dwt_receivable_amount'] = dwt_data['receivableAmount'];
        ret_arr['dwt_payable_amount'] = dwt_data['payableAmount'];
        ret_arr['dwt_commission_amount'] = dwt_data['commissionAmount'];

        return res.status(200).json({ success: true, data: ret_arr })
    });
}

module.exports = {
    getDrawMasterTransList,
    createDrawMasterTrans,
    updateDrawMasterTrans,
    getDrawMasterTransDataById
}