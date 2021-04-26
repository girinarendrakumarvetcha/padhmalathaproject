const Contact_master = require('../models/contact_master-model.js');

createContact = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a customer details'
        })
    }
    const req_obj = {};
    req_obj['name']      = body.customer_name;
    req_obj['email']     = body.customer_email;
    req_obj['address']   = body.customer_address;
    req_obj['phone']     = body.customer_phonenumber;
    
    const contact_master = new Contact_master(req_obj);
    if(!contact_master){
        return res.status(400).json({
            success : false,
            error : err
        })
    }
    //console.log(contact_master);
    contact_master.save(function(err,data){
        console.log(err);
        const statuscode = (err)?400:200;   
        return res.status(statuscode).json({
            err,
            data,
            success:true,
            message: 'Contact created successfully.'
        });
    });
} 
updateContact = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a customer to update'
        })
    }
    Contact_master.findOne({_id : req.params.id},(err,contact_master) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        contact_master.name  = body.customer_name,
        contact_master.email  = body.customer_email,
        contact_master.phone  = body.customer_phonenumber,
        contact_master.whatsapp  = body.customer_whatsapp_number,
        contact_master.address  = body.customer_address,
        // contact_master.addedBy  = 1,
        // contact_master.addedDate  = new Date(),
        contact_master.updatedBy  = 1
        contact_master.updatedDate  = new Date();
        contact_master.save(function(err,data){
            const statuscode = (err)?400:200;   
            return res.status(statuscode).json({
                err,
                data,
                success:true,
                message: 'Customer updated successfully.'
            });
        });
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
        const  contact_master_data = {};
        contact_master_data['customer_name']   = contact_master.name
        contact_master_data['customer_email']   = contact_master.email
        contact_master_data['customer_phonenumber']   = contact_master.phone
        contact_master_data['customer_whatsapp_number']   = contact_master.whatsapp
        contact_master_data['customer_address']   = contact_master.address
        return res.status(200).json({ success: true, data: contact_master_data });
    }).catch(err => console.log(err))
}

getContactList = async (req, res) => {
    await Contact_master.find({}, (err, contact_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  customer_data = [];
        for( i in contact_master ){
            const dummy_arr = {}
            dummy_arr['cus_id'] = contact_master[i]['_id'];
            dummy_arr['cus_name'] = contact_master[i]['name'];
            dummy_arr['cus_email'] = contact_master[i]['email'];
            dummy_arr['cus_phone'] = contact_master[i]['phone'];
            dummy_arr['cus_whatsapp'] = contact_master[i]['whatsapp'];
            customer_data.push(dummy_arr);
        }
        
        return res.status(200).json({ success: true, data: customer_data })
    }).catch(err => console.log(err))
}

getCustomerDropdown = async (req, res) => {
    await Contact_master.find({}, (err, contact_master) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!contact_master) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  customer_data = [];
        for( i in contact_master ){
            const dummy_arr = {}
            dummy_arr['value'] = contact_master[i]['_id'];
            dummy_arr['label'] = contact_master[i]['name'];
            customer_data.push(dummy_arr);
        }
        
        return res.status(200).json({ success: true, data: customer_data })
    }).catch(err => console.log(err))
}

module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContactById,
    getContactList,
    getCustomerDropdown
}