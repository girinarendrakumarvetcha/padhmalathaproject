const Amount_catalog = require('../models/amount_catalog-model.js');

createAmtCatalogue = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a Catlog'
        })
    }
    const req_obj = {};
    req_obj['name']      = body.ac_name;
    req_obj['amount']     = body.ac_amount;
    req_obj['shortCode']   = body.ac_short_code;
    
    const amount_catalog = new Amount_catalog(req_obj);
    if(!amount_catalog){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    console.log(amount_catalog);
    amount_catalog.save(function(err,result){
        console.log(err);
        const statuscode = (err)?400:200;   
        return res.status(statuscode).json({
            err,
            result,
            message: 'Contact created successfully.'
        });
    });
} 
updateAmtCatalogue = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a customer to update'
        })
    }
    console.log(body);
    Amount_catalog.findOne({_id : req.params.id},(err,amount_catalog) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }

        amount_catalog.name         = body.ac_name,
        amount_catalog.amount       = body.ac_amount,
        amount_catalog.shortCode    = body.ac_short_code,
        amount_catalog.updatedBy    = 1
        amount_catalog.updatedDate  = new Date();
        amount_catalog.save(function(err,result){
            const statuscode = (err)?400:200;   
            return res.status(statuscode).json({
                err,
                result,
                message: 'Amount Catalogue updated successfully.'
            });
        });
    })
}

deleteAmtCatalogue = async (res,req) => {
    
    await Amount_catalog.findOneAndDelete({_id : req.params.id},(err,amount_catalog) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!amount_catalog) {
            return res
                .status(404)
                .json({ success: false, error: `customer not found` })
        }

        return res.status(200).json({ success: true, data: amount_catalog })
    }).catch(err => console.log(err))

}

getAmtCatalogueById = async (req, res) => {
    await Amount_catalog.findOne({ _id: req.params.id }, (err, amt_catalogue) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!amt_catalogue) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  amt_catalogue_data = {};
        amt_catalogue_data['ac_id'] = amt_catalogue._id;
        amt_catalogue_data['ac_name'] = amt_catalogue.name;
        amt_catalogue_data['ac_amount'] = amt_catalogue.amount;
        amt_catalogue_data['ac_short_code'] = amt_catalogue.shortCode;
        return res.status(200).json({ success: true, data: amt_catalogue_data })
    }).catch(err => console.log(err))
}

getAmtCatalogueList = async (req, res) => {
    await Amount_catalog.find({}, (err, amount_catalog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!amount_catalog) {
            return res
                .status(404)
                .json({ success: false, error: `NO catalogue not found` })
        }
        const  amt_catalog_data = [];
        for( i in amount_catalog ){
            const dummy_arr = {}
            dummy_arr['ac_id'] = amount_catalog[i]['_id'];
            dummy_arr['ac_name'] = amount_catalog[i]['name'];
            dummy_arr['ac_amount'] = amount_catalog[i]['amount'];
            dummy_arr['ac_short_code'] = amount_catalog[i]['shortCode'];
            amt_catalog_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: amt_catalog_data })
    }).catch(err => console.log(err))
}

getAmtCatalogueDrpdwn = async (req, res) => {
    await Amount_catalog.find({}, (err, amount_catalog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!amount_catalog) {
            return res
                .status(404)
                .json({ success: false, error: `NO catalogue not found` })
        }
        const  amt_catalog_data = [];
        for( i in amount_catalog ){
            const dummy_arr = {}
            dummy_arr['value'] = amount_catalog[i]['_id'];
            dummy_arr['amount'] = amount_catalog[i]['amount'];
            dummy_arr['label'] = amount_catalog[i]['name'];
            amt_catalog_data.push(dummy_arr);
        }
        
        return res.status(200).json({ success: true, data: amt_catalog_data })
    }).catch(err => console.log(err))
}

module.exports = {
    createAmtCatalogue,
    updateAmtCatalogue,
    deleteAmtCatalogue,
    getAmtCatalogueById,
    getAmtCatalogueList,
    getAmtCatalogueDrpdwn
}