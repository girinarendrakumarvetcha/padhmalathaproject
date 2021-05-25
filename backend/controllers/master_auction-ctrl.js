const Master_auction = require('../models/auction_master-model.js');
const Record_transaction_master = require('../models/record_transaction_master-model.js');
//const Master_auction_trans = require('../models/auction_master_trans-model.js');
// const auctionRouter = require('./routes/auction-router');
const recordTransactionMasterCtrl = require('../controllers/record_transaction_master-ctrl');

getAuctionList = async (req, res) => {
    await Master_auction.find({}, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        const ret_arr = [];
        for (let data of auction_master) {
            const dummy_arr = {};
            dummy_arr['ma_id'] = data['_id'];
            dummy_arr['ma_name'] = data['name'];
            dummy_arr['ma_print_name'] = data['printName'];
            dummy_arr['ma_auction_installments'] = data['auctionInstallments'];
            dummy_arr['ma_amount'] = data['auctionAmount'];
            dummy_arr['ma_shortCode'] = data['shortCode'];
            // dummy_arr['ma_unique_code']     = data['auctionUniqueCode'];  
            // dummy_arr['ma_added_by']        = data['auctionAddedBy'];     
            // dummy_arr['ma_added_date']      = data['auctionAddedDate'];   
            // dummy_arr['ma_updated_by']      = data['auctionUpdatedBy'];   
            // dummy_arr['ma_updated_date']    = data['auctionUpdatedDate']; 
            // dummy_arr['ma_status']          = data['auctionStatus']; 
            ret_arr.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: ret_arr })
    }).catch(err => console.log(err))
}

getAuctionDrpdwn = async (req, res) => {
    await Master_auction.find({}, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `No data found..!` })
        }
        const ret_arr = [];
        for (let data of auction_master) {
            const dummy_arr = {};
            dummy_arr['value'] = data['_id'];
            dummy_arr['label'] = data['name'];
            dummy_arr['dl_draw_amount'] = data['auctionAmount'];
            dummy_arr['dl_amt_catalog'] = data['amtCatalogueId'];
            dummy_arr['dl_total_amount'] = data['auctionAmount'];
            dummy_arr['dl_installments'] = data['installments'];
            dummy_arr['dl_interval_cycle'] = data['intervalCycle'];
            dummy_arr['dl_interval_period'] = data['intervalDays'];
            dummy_arr['dl_commission'] = data['commissionAmount'];
            dummy_arr['dl_total_commission'] = data['totalCommission'];
            dummy_arr['dl_installment_amount'] = data['installmentAmount'];
            dummy_arr['dl_before_withdraw_amount'] = data['beforeWithDraw'];
            dummy_arr['dl_after_withdraw_amount'] = data['afterWithDraw'];
            dummy_arr['dl_bonus_amount'] = data['bonusAmount'];
            ret_arr.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: ret_arr })
    }).catch(err => console.log(err))
}

createAuction = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a some data..!'
        })
    }
    //console.log(body);
    const ins_arr = {};
    const trans_arr = [];
    const step_arr = [];
    const receivable_arr = [];
    const payable_arr = [];
    for (var i in body) {

        if (i.indexOf('amt_installment_step_no_') != -1) {
            step_arr[i] = body[i];
        }
        else if (i.indexOf('amt_receivable_amount_') != -1) {
            receivable_arr[i] = body[i];
        }
        else if (i.indexOf('amt_payable_amount_') != -1) {
            payable_arr[i] = body[i];
        }
        else {
            ins_arr[i] = body[i];
        }
    }

    for (var i in receivable_arr) {
        const variable_index = i.replace('amt_receivable_amount_', '');
        variable_index_inc = Number(variable_index) + 1;
        trans_arr.push({
            'installmentStepNo': variable_index_inc,
            'receivableAmount': receivable_arr['amt_receivable_amount_' + variable_index],
            'payableAmount': payable_arr['amt_payable_amount_' + variable_index]
        });
    }

    const req_obj = {};
    req_obj['name'] = ins_arr.ma_name;
    req_obj['printName'] = ins_arr.ma_print_name;
    req_obj['amtCatalogueId'] = ins_arr.ma_amt_catalog.value;
    req_obj['auctionAmount'] = ins_arr.ma_auction_amount;
    req_obj['defineType'] = ins_arr.ma_define_type.value;
    req_obj['auctionInstallments'] = ins_arr.ma_auction_installments;
    req_obj['definedInstallments'] = ins_arr.ma_defined_installments;
    req_obj['intervalCycle'] = ins_arr.ma_interval_period.value;
    req_obj['intervalDays'] = ins_arr.ma_interval_period.interval;
    req_obj['commissionAmt'] = ins_arr.ma_commission;
    req_obj['totalComAmt'] = ins_arr.ma_auction_installments * ins_arr.ma_commission;
    req_obj['installmentAmt'] = ins_arr.ma_installment_amount;
    req_obj['beforeWithDraw'] = ins_arr.ma_before_withdraw_amount;
    req_obj['afterWithDraw'] = ins_arr.ma_after_withdraw_amount;
    req_obj['bonusAmount'] = ins_arr.ma_bonus_amount;
    let transaction_arr =  await recordTransactionMasterCtrl.getRecordTransactionByValue('auction');
    req_obj['shortCode'] = (transaction_arr.prefixCode+(Number(transaction_arr.suffixCode) +1));
    //req_obj['shortCode'] = ins_arr.ma_short_code;
    req_obj['status'] = ins_arr.ma_status.value;
    //req_obj['addedBy']              = 1;
    //req_obj['addedDate']            = Date.now;
    //req_obj['isVariableAmount']   = body.ma_name;
    // req_obj['uniqueCode']        = body.ma_name
    // req_obj['updatedBy']         = body.ma_name
    // req_obj['updatedDate']       = body.ma_name
    req_obj['transactionData'] = trans_arr;
    //console.log(req_obj);
    const auction_master = new Master_auction(req_obj);
    console.log(auction_master);
    if (!auction_master) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }
    
    auction_master.save(function (err, data) {        
        const statuscode = (err) ? 400 : 200;
        if(!err){
          Record_transaction_master.findOneAndUpdate({
                query:{moduleCode: 'auction'},
                update: {$inc:{suffixCode:1}},
                    new:true
                 });
        }
        return res.status(statuscode).json({
            err,
            data,
            success:true,
            message: 'Record saved successfully.'
        });
    });
}
updateAuction = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a details to update'
        })
    }
    Master_auction.findOne({ _id: req.params.id }, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ err, message: 'customer not found..!' });
        }

        const ins_arr = {};
        const trans_arr = [];
        const step_arr = [];
        const receivable_arr = [];
        const payable_arr = [];
        console.log(body)
        for (var i in body) {

            if (i.indexOf('amt_installment_step_no_') != -1) {
                step_arr[i] = body[i];
            }
            else if (i.indexOf('amt_receivable_amount_') != -1) {
                receivable_arr[i] = body[i];
            }
            else if (i.indexOf('amt_payable_amount_') != -1) {
                payable_arr[i] = body[i];
            }
            else {
                ins_arr[i] = body[i];
            }
        }
        for (var i in step_arr) {
            const variable_index = i.replace('amt_installment_step_no_', '');
            variable_index_inc = Number(variable_index) + 1;
            trans_arr.push({
                'installmentStepNo': step_arr['amt_installment_step_no_' + variable_index],
                'receivableAmount': receivable_arr['amt_receivable_amount_' + variable_index],
                'payableAmount': payable_arr['amt_payable_amount_' + variable_index]
            });
        }

        auction_master['name'] = body.ma_name;
        auction_master['printName']             = body.ma_print_name;
        auction_master['amtCatalogueId']           = body.ma_amt_catalog.value;
        auction_master['auctionAmount']         = body.ma_auction_amount;
        auction_master['auctionInstallments']   = body.ma_auction_installments;
        auction_master['definedInstallments']   = body.ma_defined_installments;
        auction_master['intervalCycle']         = body.ma_interval_period.value;
        auction_master['intervalDays']          = body.ma_interval_period.interval;
        auction_master['beforeWithDraw']        = body.ma_before_withdraw_amount;
        auction_master['afterWithDraw']         = body.ma_after_withdraw_amount;
        auction_master['bonusAmount']           = body.ma_bonus_amount;
        auction_master['shortCode']             = body.ma_short_code;
        auction_master['status']                = body.ma_status.value;
        auction_master['commissionAmt']         = body.ma_commission;
        auction_master['totalComAmt']           = body.ma_auction_installments * body.ma_commission;
        auction_master['installmentAmt']        = body.ma_installment_amount;
        auction_master['transactionData']       = trans_arr;

        //console.log(auction_master);
        auction_master.save(function(err,data){
            const statuscode = (err)?400:200;   
            return res.status(statuscode).json({
                err,
                data,
                success:true,
                message: 'Record updated successfully.'
            });
        });
    });
}

deleteAuction = async (res, req) => {

    await Master_auction.findOneAndDelete({ _id: req.params.id }, (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `customer not found` })
        }

        return res.status(200).json({ success: true, data: auction_master })
    }).catch(err => console.log(err))

}

getAuctionById = async (req, res) => {

    await Master_auction.aggregate([
        {
            $addFields: {
                amtCatalogueId: { $toObjectId: "$amtCatalogueId" },
                auctionMasterId: { $toString: "$_id" }
            }
        },
        {
            $match: { auctionMasterId: req.params.id }
        },
        {
            $lookup:
            {
                from: "catalog_master",
                localField: "amtCatalogueId",
                foreignField: "_id",
                as: "amt_catalog_dropdown"
            }
        }
    ], (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        auction_master = auction_master[0];
        console.log(auction_master);
        const auction_master_data = {};
        auction_master_data['ma_name'] = auction_master['name'];
        auction_master_data['ma_print_name'] = auction_master['printName'];
        auction_master_data['ma_amt_catalog_id'] = auction_master['amtCatalogueId'];
        auction_master_data['ma_auction_amount'] = auction_master['auctionAmount'];
        auction_master_data['ma_define_type'] = auction_master['defineType'];
        auction_master_data['ma_auction_installments'] = auction_master['auctionInstallments'];
        auction_master_data['ma_defined_installments'] = auction_master['definedInstallments'];
        auction_master_data['ma_interval_cycle'] = auction_master['intervalCycle'];
        auction_master_data['ma_interval_days'] = auction_master['intervalDays'];
        auction_master_data['ma_commission'] = auction_master['commissionAmt'];
        auction_master_data['ma_installment_amount'] = auction_master['installmentAmt'];
        auction_master_data['ma_before_withdraw_amount'] = auction_master['beforeWithDraw'];
        auction_master_data['ma_after_withdraw_amount'] = auction_master['afterWithDraw'];
        auction_master_data['ma_bonus_amount'] = auction_master['bonusAmount'];
        auction_master_data['ma_short_code'] = auction_master['shortCode'];
        auction_master_data['ma_status'] = auction_master['status'];
        let  sel_amt_catalog_dropdown = {};
        if(auction_master['amt_catalog_dropdown'].length){
            sel_amt_catalog_dropdown['value'] = auction_master['amt_catalog_dropdown'][0]['_id'];
            sel_amt_catalog_dropdown['amount'] = auction_master['amt_catalog_dropdown'][0]['amount'];
            sel_amt_catalog_dropdown['label'] = auction_master['amt_catalog_dropdown'][0]['name'];
        }

        auction_master_data['sel_amt_catalog_dropdown'] = sel_amt_catalog_dropdown;
        auction_master_data['sel_interval_period'] = { value : auction_master['intervalCycle'],interval : auction_master['intervalDays'], label:'Monthly'};
        const trans_arr = [];

        for (var i in auction_master['transactionData']) {
            var dummy_arr = {};
            dummy_arr['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
            dummy_arr['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
            dummy_arr['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
            trans_arr.push(dummy_arr);
            auction_master_data['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
            auction_master_data['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
            auction_master_data['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
        }
        auction_master_data['trans_arr'] = trans_arr;
        return res.status(200).json({ success: true, data: auction_master_data })
    }).catch(err => console.log(err));

    // await Master_auction.findOne({ _id: req.params.id }, (err, auction_master) => {
    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     }

    //     if (!auction_master) {
    //         return res
    //             .status(404)
    //             .json({ success: false, error: `Customer not found` })
    //     }
    //     const auction_master_data = {};
    //     auction_master_data['ma_name'] = auction_master['name'];
    //     auction_master_data['ma_print_name'] = auction_master['printName'];
    //     auction_master_data['ma_amt_catalog_id'] = auction_master['amtCatalogueId'];
    //     auction_master_data['ma_auction_amount'] = auction_master['auctionAmount'];
    //     auction_master_data['ma_installments'] = auction_master['installments'];
    //     auction_master_data['ma_interval_cycle'] = auction_master['intervalCycle'];
    //     auction_master_data['ma_interval_days'] = auction_master['intervalDays'];
    //     auction_master_data['ma_commission'] = auction_master['commissionAmt'];
    //     auction_master_data['ma_installment_amount'] = auction_master['installmentAmt'];
    //     auction_master_data['ma_before_withdraw_amount'] = auction_master['beforeWithDraw'];
    //     auction_master_data['ma_after_withdraw_amount'] = auction_master['afterWithDraw'];
    //     auction_master_data['ma_bonus_amount'] = auction_master['bonusAmount'];
    //     auction_master_data['ma_short_code'] = auction_master['shortCode'];
    //     auction_master_data['ma_status'] = auction_master['status'];

    //     const trans_arr = [];

    //     for (var i in auction_master['transactionData']) {
    //         var dummy_arr = {};
    //         dummy_arr['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
    //         dummy_arr['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
    //         dummy_arr['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
    //         trans_arr.push(dummy_arr);
    //         auction_master_data['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
    //         auction_master_data['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
    //         auction_master_data['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
    //     }
    //     auction_master_data['trans_arr'] = trans_arr;

    //     return res.status(200).json({ success: true, data: auction_master_data })
    // }).catch(err => console.log(err))
}

getAuctionDetailsForDraw = async (req, res) => {

    await Master_auction.aggregate([
        {
            $addFields: {
                amtCatalogueId: { $toObjectId: "$amtCatalogueId" },
                auctionMasterId: { $toString: "$_id" }
            }
        },
        {
            $match: { auctionMasterId: req.params.id }
        },
        {
            $lookup:
            {
                from: "catalog_master",
                localField: "amtCatalogueId",
                foreignField: "_id",
                as: "amt_catalog_dropdown"
            }
        }
    ], (err, auction_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auction_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        auction_master = auction_master[0];
        console.log(auction_master);
        const auction_master_data = {};
        auction_master_data['dl_name'] = auction_master['name'];
        auction_master_data['dl_print_name'] = auction_master['printName'];
        auction_master_data['dl_amt_catalog_id'] = auction_master['amtCatalogueId'];
        auction_master_data['dl_auction_amount'] = auction_master['auctionAmount'];
        auction_master_data['dl_define_type'] = auction_master['defineType'];
        auction_master_data['dl_draw_installments'] = auction_master['auctionInstallments'];
        auction_master_data['dl_defined_installments'] = auction_master['definedInstallments'];
        auction_master_data['dl_interval_cycle'] = auction_master['intervalCycle'];
        auction_master_data['dl_interval_days'] = auction_master['intervalDays'];
        auction_master_data['dl_commission'] = auction_master['commissionAmt'];
        auction_master_data['dl_installment_amount'] = auction_master['installmentAmt'];
        auction_master_data['dl_before_withdraw_amount'] = auction_master['beforeWithDraw'];
        auction_master_data['dl_after_withdraw_amount'] = auction_master['afterWithDraw'];
        auction_master_data['dl_bonus_amount'] = auction_master['bonusAmount'];
        auction_master_data['dl_short_code'] = auction_master['shortCode'];
        auction_master_data['dl_status'] = auction_master['status'];
        let  sel_amt_catalog_dropdown = {};
        if(auction_master['amt_catalog_dropdown'].length){
            sel_amt_catalog_dropdown['value'] = auction_master['amt_catalog_dropdown'][0]['_id'];
            sel_amt_catalog_dropdown['amount'] = auction_master['amt_catalog_dropdown'][0]['amount'];
            sel_amt_catalog_dropdown['label'] = auction_master['amt_catalog_dropdown'][0]['name'];
        }

        auction_master_data['sel_amt_catalog_dropdown'] = sel_amt_catalog_dropdown;
        auction_master_data['sel_interval_period'] = { value : auction_master['intervalCycle'],interval : auction_master['intervalDays'], label:'Monthly'};
        const trans_arr = [];

        for (var i in auction_master['transactionData']) {
            var dummy_arr = {};
            dummy_arr['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
            dummy_arr['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
            dummy_arr['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
            trans_arr.push(dummy_arr);
            auction_master_data['amt_installment_step_no_' + i] = auction_master['transactionData'][i]['installmentStepNo'];
            auction_master_data['amt_receivable_amount_' + i] = auction_master['transactionData'][i]['receivableAmount'];
            auction_master_data['amt_payable_amount_' + i] = auction_master['transactionData'][i]['payableAmount'];
        }
        auction_master_data['trans_arr'] = trans_arr;
        return res.status(200).json({ success: true, data: auction_master_data })
    }).catch(err => console.log(err));
}

module.exports = {
    getAuctionList,
    createAuction,
    updateAuction,
    deleteAuction,
    getAuctionById,
    getAuctionDetailsForDraw,
    getAuctionDrpdwn
}