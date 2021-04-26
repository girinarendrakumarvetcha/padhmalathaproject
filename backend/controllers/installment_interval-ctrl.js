const Interval_master = require('../models/interval_master-model.js');

createInterval = (req,res) => {
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
    
    const installment_interval = new Interval_master(req_obj);
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
updateInterval = async (req,res) => {
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
    Interval_master.findOne({_id : req.params.id},(err,installment_interval) => {
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
                message: 'Interval updated successfully.'
            });
        });
    })
}

deleteInterval = async (res,req) => {
    
    await Interval_master.findOneAndDelete({_id : req.params.id},(err,installment_interval) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!installment_interval) {
            return res
                .status(404)
                .json({ success: false, error: `customer not found` })
        }

        return res.status(200).json({ success: true, data: installment_interval })
    }).catch(err => console.log(err))

}

getIntervalById = async (req, res) => {
    await Interval_master.findById({ _id: req.params.id }, (err, installment_interval) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!installment_interval) {
            return res
                .status(404)
                .json({ success: false, error: `Interval details not found` })
        }
        const  interval_data = {};
        interval_data['im_id'] = installment_interval._id;
        interval_data['im_name'] = installment_interval.name;
        interval_data['im_interval'] = installment_interval.interval;
        interval_data['im_short_code'] = installment_interval.shortCode;
        return res.status(200).json({ success: true, data: interval_data });
    }).catch(err => console.log(err))
}

getInstallmentIntervalList = async (req, res) => {
    await Interval_master.find({}, (err, installment_interval) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!installment_interval) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        
        const  interval_data = [];
        for( i in installment_interval ){
            const dummy_arr = {}
            dummy_arr['im_id'] = installment_interval[i]['_id'];
            dummy_arr['im_name'] = installment_interval[i]['name'];
            dummy_arr['im_interval'] = installment_interval[i]['interval'];
            dummy_arr['im_short_code'] = installment_interval[i]['shortCode'];
            interval_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: interval_data })
    }).catch(err => console.log(err))
}
getIntervalDrpdown = async (req, res) => {
    await Interval_master.find({}, (err, installment_interval) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!installment_interval) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        
        const  interval_data = [];
        for( i in installment_interval ){
            const dummy_arr = {}
            dummy_arr['value'] = installment_interval[i]['shortCode'];
            dummy_arr['interval'] = installment_interval[i]['interval'];
            dummy_arr['label'] = installment_interval[i]['name'];
            interval_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: interval_data })
    }).catch(err => console.log(err))
}

module.exports = {
    createInterval,
    updateInterval,
    deleteInterval,
    getIntervalById,
    getInstallmentIntervalList,
    getIntervalDrpdown
}