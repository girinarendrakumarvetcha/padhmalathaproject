const Draw_invoice_payment = require('../models/draw_invoice_payment-model.js');
const Draw_master = require('../models/draw_master-model.js');
const Draw_invoice = require('../models/draw_invoice-model.js');
//const Draw_invoice_controller = require('../models/draw_invoice-ctrl.js');
const moment = require('moment');

getDrawInvoicePaymentList = async (req, res) => {
    console.log(req.params.id);
    await Draw_invoice_payment.find({ drawInvoiceId : req.params.id}, (err, dip_data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!dip_data) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        const ret_arr = [];
        for(let data of dip_data) {
            const dummy_arr = {};
            dummy_arr['dip_id']            = data['_id'];        
            dummy_arr['dip_short_code']    = data['shortCode'];
            dummy_arr['dip_paid_amount']   = data['paymentAmount'];        
            dummy_arr['dip_paid_date']     = data['paymentDate'];   
            ret_arr.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: ret_arr })
    }).catch(err => console.log(err))
}
createDrawInvoicePayment = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a some data..!'
        })
    }
    let req_obj = [];
    req_obj['drawInvoiceId']  = body.dip_draw_invoice;
    req_obj['paymentAmount']  = body.dip_payment_amount;
    req_obj['paymentDate']  = body.dip_payment_date;  
    req_obj['shortCode']  = body.dip_short_code;    
    //req_obj['allocatedDraw']  = body.dip_;
    // req_obj['addedBy']  = body.dip_;      
    // req_obj['addedDate']  = body.dip_;    
    // req_obj['updatedBy']  = body.dip_;    
    // req_obj['updatedDate']  = body.dip_;
    const draw_invoice_payment = new Draw_invoice_payment(req_obj);
    draw_invoice_payment.save(function(err,result){
        console.log(err);  
        const statuscode = (err)?400:200; 
    });
    var req = {};
    req['params'] = {};
    req['params']['id'] = body.dip_draw_invoice;
    var paind_amt = {};
    paind_amt['paid_amount'] = body.dip_payment_amount;
    console.log(req.params.id);
    Draw_invoice.findOne({_id : req.params.id},(err,di_data) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        //console.log(di_data);
        var paid_amount = di_data.paidAmount;
        di_data['paidAmount']  = Number(paid_amount) + Number(paind_amt['paid_amount']);
        di_data['paidDate']    = new Date();
        // console.log(draw_invoice_payment);
        // console.log(di_data['paidAmount']);
        // console.log(paid_amount + paind_amt['paid_amount']);
        // console.log(paind_amt);
        di_data.save(function(err,result){
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
updateDrawInvoicePayment = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a details to update'
        })
    }
    Draw_invoice_payment.findOne({_id : req.params.id},(err,di_data) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        var paid_amount = di_data.paidAmount;
        di_data['paidAmount']  = paid_amount + body.dip_paid_amount;
        di_data['paidDate']    = new Date();
        console.log(di_data);
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
getDrawInvoicePaymentDataById = async (req, res) => {
    await Master_auction.findOne({ _id: req.params.id }, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  auction_master_data = {};
        auction_master_data['dl_name']           = auction_master['name'] ;            
        auction_master_data['dl_print_name']     = auction_master['printName'];
        auction_master_data['dl_auction_master']     = req.params.id;
        //auction_master_data['dl_amt_catalog_id'] = auction_master['amtCatlogId'] ;
        auction_master_data['dl_total_amount']   = auction_master['totalAmount'];
        auction_master_data['dl_draw_amount']   = auction_master['totalAmount'];
        auction_master_data['dl_installments']   = auction_master['installments'];
        auction_master_data['dl_interval_cycle'] = auction_master['intervalCycle'];
        auction_master_data['dl_interval']          = auction_master['intervalDays'];
        auction_master_data['dl_commission']     = auction_master['commissionAmt'];
        auction_master_data['dl_installment_amount'] = auction_master['installmentAmt'];
        auction_master_data['dl_before_withdraw_amount']   = auction_master['beforeWithDraw'];
        auction_master_data['dl_after_withdraw_amount']    = auction_master['afterWithDraw'] ;
        auction_master_data['dl_bonus_amount']              = auction_master['bonusAmount'] ;
        auction_master_data['dl_short_code']                = auction_master['shortCode'] ;
        auction_master_data['dl_status']                    = auction_master['status'] ;
        for( var i in auction_master['transactionData']  ){
            auction_master_data['dl_installment_step_no_'+i] = auction_master['transactionData'][i]['installmentStepNo'];
            auction_master_data['dl_receivable_amount_'+i] = auction_master['transactionData'][i]['receivableAmount'];
            auction_master_data['dl_payable_amount_'+i] = auction_master['transactionData'][i]['payableAmount'] ;
        }
        return res.status(200).json({ success: true, data: auction_master_data })
    }).catch(err => console.log(err));

    // await Draw_invoice_payment.aggregate([
    //     {
    //           $match: { drawInvoiceId : req.params.id }
    //       },
    //       {
    //      $addFields: {
    //         drawInvoiceId: { $toObjectId: "$drawInvoiceId" }
    //      }
    //   },
    //        {
    //        $lookup:
    //          {
    //            from: "di_data",
    //            localField: "contactMasterId",
    //            foreignField: "_id",
    //            as: "customer_details"
    //          }
    //     }
    //   ]).exec((err, draw_invoice) => {
           
    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     }
    //     if (!dip_data) {
    //         return res
    //             .status(404)
    //             .json({ success: false, error: `No data found..!` })
    //     }
    //     const ret_arr = [];
    //     for(let data of dip_data) {
    //         const dummy_arr = {};
    //         dummy_arr['dip_id']            = data['_id'];        
    //         dummy_arr['dip_name']            = data['name'];        
    //         dummy_arr['dip_date']            = data['drawDate'];   
    //         dummy_arr['dip_installments']    = data['installments'];
    //         dummy_arr['dip_amount']          = data['drawAmount'];      
    //         dummy_arr['dip_short_code']       = data['shortCode'];  
    //         ret_arr.push(dummy_arr);
    //     }
    //     return res.status(200).json({ success: true, data: ret_arr })
    // });
}

module.exports = {
    getDrawInvoicePaymentList,
    createDrawInvoicePayment,
    updateDrawInvoicePayment,
    getDrawInvoicePaymentDataById
}