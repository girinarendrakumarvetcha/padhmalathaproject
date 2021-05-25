const Draw_master = require('../models/draw_master-model.js');
const Draw_master_trans = require('../models/draw_master_trans-model.js');
const Draw_invoice = require('../models/draw_invoice-model.js');
const Master_auction = require('../models/auction_master-model.js');
const Contact_master = require('../models/contact_master-model.js');
const Draw_group = require('../models/draw_group-model.js');
const moment = require('moment');
const { exists } = require('../models/draw_master-model.js');

getDrawList = async (req, res) => {
    await Draw_master.find({}, (err, draw_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!draw_master) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        const ret_arr = [];
        for(let data of draw_master) {
            const dummy_arr = {};
            dummy_arr['dl_id']            = data['_id'];        
            dummy_arr['dl_name']            = data['name'];        
            dummy_arr['dl_date']            = data['drawDate'];   
            dummy_arr['dl_draw_installments']    = data['installments'];
            dummy_arr['dl_amount']          = data['drawAmount'];      
            dummy_arr['dl_short_code']       = data['shortCode'];   
            // dummy_arr['dl_unique_code']     = data['drawUniqueCode'];  
            // dummy_arr['dl_added_by']        = data['drawAddedBy'];     
            // dummy_arr['dl_added_date']      = data['drawAddedDate'];   
            // dummy_arr['dl_updated_by']      = data['drawUpdatedBy'];   
            // dummy_arr['dl_updated_date']    = data['drawUpdatedDate']; 
            // dummy_arr['dl_status']          = data['drawStatus']; 
            ret_arr.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: ret_arr })
    }).catch(err => console.log(err))
}

createDraw = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a some data..!'
        })
    }
    const ins_arr = {};
    const trans_arr = [];
    const step_arr = [];
    const receivable_arr = [];
    const payable_arr = [];
    //console.log(body);
    for( var i in body ){
        
        if(i.indexOf('dl_installment_step_no_') != -1){
            step_arr[i] = body[i];
        }
        else if(i.indexOf('dl_receivable_amount_') != -1){
            receivable_arr[i] = body[i];
        }
        else if(i.indexOf('dl_payable_amount_') != -1){
            payable_arr[i] = body[i];
        }
        else{
            ins_arr[i] = body[i];
        }
    }    

    for( var i in step_arr ){
        const variable_index = i.replace('dl_installment_step_no_','');
        variable_index_inc = Number(variable_index)+1;
        trans_arr.push({
            'installmentStepNo' : step_arr['dl_installment_step_no_'+variable_index],
            'receivableAmount'  : receivable_arr['dl_receivable_amount_'+variable_index],
            'payableAmount'     : payable_arr['dl_payable_amount_'+variable_index]
        } ); 
    }
        
    const req_obj = {};
    req_obj['name']                 = ins_arr.dl_name;
    req_obj['print_name']           = ins_arr.dl_print_name;
    req_obj['auctionMasterId']      = ins_arr.dl_auction_master.value;
    req_obj['drawDate']             = ins_arr.dl_draw_date;
    req_obj['drawGroupId']          = ins_arr.dl_draw_group.value;
    //req_obj['contactCount']         = ins_arr.dl_draw_installments;
    req_obj['isVariableBonus']      = 'No';
    req_obj['printName']            = ins_arr.dl_print_name;
    req_obj['amtCatlogId']          = ins_arr.dl_amt_catalog.value;
    req_obj['drawAmount']           = ins_arr.dl_total_amount;
    req_obj['installments']         = ins_arr.dl_draw_installments;
    req_obj['intervalCycle']        = ins_arr.dl_interval_cycle.value;
    req_obj['intervalDays']         = ins_arr.dl_interval_cycle.interval;
    req_obj['commissionAmt']        = ins_arr.dl_commission;
    req_obj['totalComAmt']          = ins_arr.dl_draw_installments * ins_arr.dl_commission;
    req_obj['installmentAmt']       = ins_arr.dl_installment_amount;
    req_obj['beforeWithDraw']       = ins_arr.dl_before_withdraw_amount;
    req_obj['afterWithDraw']        = ins_arr.dl_after_withdraw_amount;
    req_obj['bonusAmount']          = ins_arr.dl_bonus_amount;
    req_obj['shortCode']            = ins_arr.dl_short_code;
    req_obj['status']               = ins_arr.dl_status;
    req_obj['transactionData']      = trans_arr;
    
    console.log(req_obj);
    const draw_master = new Draw_master(req_obj);
    draw_master.save(function(err,result){
        console.log(err);  
        const statuscode = (err)?400:200; 
        // return res.status(statuscode).json({
        //     err,
        //     result,
        //     message: 'Record saved successfully.'
        // });
    });
    let draw_log_trans_arr = [];
    let group_customers_ids  = [];
    await Draw_group.findOne({ _id: ins_arr.dl_draw_group.value }, (err, draw_group) => {
        group_customers_ids  = draw_group.contactIds.split(',');      
    }).catch(err => console.log(err));
    //const invoice_data_arr = [];
    for( var i in group_customers_ids){    
        const dummy_data= {
            drawMasterId        : draw_master._id,
            contactId           : group_customers_ids[i],
            drawBookCode        : req_obj['shortCode'] + '00'+ i+1,
            installmentStepNo   : 0,
            actualWithdrawDate  : '',
            withdrawDate        : '',
            isWithdrawed        : 'No',
            receivableAmount    : 0,
            commissionAmount    : req_obj['commissionAmt'],
            payableAmount       : 0,
            AddedBy             : '',
            AddedDate           : '',
            UpdatedBy           : '',
            UpdatedDate         : '',
            Status              : 'Active'
        };
        const draw_master_trans_data = new Draw_master_trans(dummy_data);
        //console.log(draw_master_trans_data);
        draw_master_trans_data.save();
        draw_log_trans_arr.push(draw_master_trans_data);
        //console.log(draw_master);
        const invoice_data_arr = [];
        //console.log(draw_master.installments);
        for(var j=1; j<= draw_master.installments;j++){
            var invoice_dummy_data = {
                drawMasterId        : draw_master._id,
                drawMasterTransId   : draw_master_trans_data._id,
                contactMasterId     : group_customers_ids[i],
                installmentStepNo   : j,
                beforePayableAmount : draw_master.beforeWithDraw,
                afterPayableAmount  : draw_master.afterWithDraw,
                bonusAmount         : draw_master.bonusAmount,
                payableAmount       : parseFloat(draw_master.afterWithDraw) - parseFloat(draw_master.bonusAmount),
                paymentStatus       : 'Unpaid',
                paymentDate         : moment(draw_master.drawDate,'YYYY-MM-DD').add(j,'months').format('YYYY-MM-DD'),
                paidDate            : moment(draw_master.drawDate,'YYYY-MM-DD').add(j,'months').format('YYYY-MM-DD'),
                paidAmount          : 0,
                // addedDate           : {type: String,required :false},
                // updatedBy           : {type: Number,required :false},
                // updatedDate         : {type: String,required :false},
                status              : 'Active'
            }
            // console.log(invoice_dummy_data);
            // var invoice_data = new Draw_invoice(invoice_dummy_data);
            // console.log(invoice_data);
            // invoice_data.save();
            // invoice_data_arr.push(invoice_data);
            // console.log(invoice_dummy_data);
            // var invoice_data = new Draw_invoice(invoice_dummy_data);
            // console.log(invoice_data);
            //invoice_data.save();

            invoice_data_arr.push(invoice_dummy_data);
           
        }
        //console.log(invoice_data_arr);
        Draw_invoice.insertMany(invoice_data_arr).then(function(){ 
            console.log("Data inserted")  // Success 
        }).catch(function(error){ 
            console.log(error)      // Failure 
        });
    }        

    // //console.log(invoice_data_arr);
    
    return res.status(200).json({
        message: 'Record saved successfully.'
    });
    

    // if(!draw_master){
    //     return res.status(400).json({
    //         success : false,
    //         error : err
    //     })
    // }
    // draw_master.save(function(err,result){ 
    //         const statuscode = (err)?400:200; 
    //         return res.status(statuscode).json({
    //             err,
    //             result,
    //             message: 'Record saved successfully.'
    //         });
    //     });

} 
updateDraw = async (res,req) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a details to update'
        })
    }
    Draw_master.findOne({_id : req.params.id},(err,draw_master) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        draw_master['drawName']          = body.dl_name;
        draw_master['drawPrintName']     = body.dl_print_name;
        draw_master['drawInstallments']  = body.dl_draw_installments;
        draw_master['drawAmount']        = body.dl_amount;
        draw_master['drawShortCode']     = body.dl_short_code;
        draw_master['drawStatus']        = body.dl_status;
        // req_obj['drawUniqueCode']    = body.dl_unique_code;
        draw_master['drawUpdatedBy']     = 1;
        draw_master['drawUpdatedDate']   = new Date();
        draw_master
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            error,
                            message: 'customer updated successfully.'
                        })              
                    })
                    .catch(error => {
                        return res.status(400).json({
                            error,
                            message: 'Unable to udpate customer..!'
                        })  
                    })
    })
}

deleteContact = async (res,req) => {
    
    await Contact_master.findOneAndDelete({_id : req.params.id},(err,contact_master) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!contact_master) {
            return res
                .status(404)
                .json({ success: false, error: `customer not found` })
        }

        return res.status(200).json({ success: true, data: contact_master })
    }).catch(err => console.log(err))

}

getContactById = async (req, res) => {
    await Contact_master.findOne({ _id: req.params.id }, (err, contact_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        return res.status(200).json({ success: true, data: contact_master })
    }).catch(err => console.log(err))
}

getDrawDataById = async (req, res) => {
    
    await Draw_master.findOne({ _id: req.params.id }, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  draw_master_data = {};
        draw_master_data['dl_name']           = auction_master['name'] ;            
        draw_master_data['dl_print_name']     = auction_master['printName'];
        draw_master_data['dl_auction_master']     = auction_master['auctionMasterId'];
        draw_master_data['dl_amt_catalog_id'] = auction_master['amtCatlogId'] ;
        draw_master_data['dl_draw_group']       = auction_master['drawGroupId'] ;
        draw_master_data['dl_total_amount']   = auction_master['drawAmount'];
        draw_master_data['dl_draw_amount']   = auction_master['drawAmount'];
        draw_master_data['dl_draw_installments']   = auction_master['installments'];
        draw_master_data['dl_interval_cycle'] = auction_master['intervalCycle'];
        draw_master_data['dl_interval']          = auction_master['intervalDays'];
        draw_master_data['dl_commission']     = auction_master['commissionAmt'];
        draw_master_data['dl_installment_amount'] = auction_master['installmentAmt'];
        draw_master_data['dl_before_withdraw_amount']   = auction_master['beforeWithDraw'];
        draw_master_data['dl_after_withdraw_amount']    = auction_master['afterWithDraw'] ;
        draw_master_data['dl_bonus_amount']              = auction_master['bonusAmount'] ;
        draw_master_data['dl_short_code']                = auction_master['shortCode'] ;
        draw_master_data['dl_status']                    = auction_master['status'] ;
        const trans_arr = [];
        for( var i in auction_master['transactionData']  ){
            var dummy_arr = {};
            dummy_arr['dl_installment_step_no_'+i] = auction_master['transactionData'][i]['installmentStepNo'];
            dummy_arr['dl_receivable_amount_'+i] = auction_master['transactionData'][i]['receivableAmount'];
            dummy_arr['dl_payable_amount_'+i] = auction_master['transactionData'][i]['payableAmount'] ;
            trans_arr.push(dummy_arr);
            draw_master_data['dl_installment_step_no_'+i] = auction_master['transactionData'][i]['installmentStepNo'];
            draw_master_data['dl_receivable_amount_'+i] = auction_master['transactionData'][i]['receivableAmount'];
            draw_master_data['dl_payable_amount_'+i] = auction_master['transactionData'][i]['payableAmount'] ;
        }
        draw_master_data['trans_arr'] = trans_arr;
        return res.status(200).json({ success: true, data: draw_master_data })
    }).catch(err => console.log(err))
}

module.exports = {
    getDrawList,
    createDraw,
    updateDraw,
    deleteContact,
    getContactById,
    getDrawDataById
}