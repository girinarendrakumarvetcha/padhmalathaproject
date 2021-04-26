const Draw_group = require('../models/draw_group-model.js');

createDrawGroup = (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a contact'
        })
    }
    const req_obj = {};
    req_obj['name']         = body.group_name;
    req_obj['shortCode']   = body.group_short_code;

    let customers_arr = body.group_customers;
    let customers_data = [];
    customers_data = customers_arr.map(function(data){
        return data['value'];
    });
    req_obj['contactIds']   = customers_data.join(',');
    
    const draw_group = new Draw_group(req_obj);
    if(!draw_group){
        return res.status(400).json({
            success : false,
            error : err
        })
    }

    draw_group.save(function(err,result){
        console.log(err);
        const statuscode = (err)?400:200;   
        
        return res.status(statuscode).json({
            err,
            result,
            message: 'DrawGroup created successfully.'
        });
    });
} 
updateDrawGroup = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a customer to update'
        })
    }
    Draw_group.findOne({_id : req.params.id},(err,draw_group) => {
        if(err){
            return res.status(400).json({err,message : 'customer not found..!'});
        }
        
        draw_group['name']         = body.group_name;
        draw_group['shortCode']   = body.group_short_code;
        // let customers_arr = body.group_customers_ids;
        // let customers_data = [];
        // customers_data = customers_arr.map(function(data){
        //     return data['value'];
        //});
        //draw_group['contactIds']   = customers_data.join(',');
        draw_group['contactIds']   = body.group_customers_ids;
        // console.log(draw_group);
        // return 1;
        
        draw_group.save(function(err,result){
            const statuscode = (err)?400:200;   
            return res.status(statuscode).json({
                err,
                result,
                message: 'Interval updated successfully.'
            });
        });
    })
}

deleteDrawGroup = async (res,req) => {
    
    await Draw_group.findOneAndDelete({_id : req.params.id},(err,draw_group) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!draw_group) {
            return res
                .status(404)
                .json({ success: false, error: `customer not found` })
        }

        return res.status(200).json({ success: true, data: draw_group })
    }).catch(err => console.log(err))

}

getDrawGroupById = async (req, res) => {
    await Draw_group.findOne({ _id: req.params.id }, (err, draw_group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!draw_group) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  group_data = {};
        group_data['group_id'] = draw_group._id;
        group_data['group_name'] = draw_group.name;
        group_data['group_short_code'] = draw_group.shortCode;
        group_data['group_customers_ids'] = draw_group.contactIds;
        return res.status(200).json({ success: true, data: group_data });
    }).catch(err => console.log(err))
}

getDrawGroupList = async (req, res) => {
    await Draw_group.find({}, (err, draw_group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!draw_group) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  draw_group_data = [];
        for( i in draw_group ){
            const dummy_arr = {}
            dummy_arr['dg_id'] = draw_group[i]['_id'];
            dummy_arr['dg_name'] = draw_group[i]['name'];
            dummy_arr['dg_short_code'] = draw_group[i]['shortCode'];
            draw_group_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: draw_group_data });
    }).catch(err => console.log(err))
}

getDrawGroupDrpdwn = async (req, res) => {
    await Draw_group.find({}, (err, draw_group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!draw_group) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        const  draw_group_data = [];
        for( i in draw_group ){
            const dummy_arr = {}
            dummy_arr['value'] = draw_group[i]['_id'];
            dummy_arr['label'] = draw_group[i]['name'];
            draw_group_data.push(dummy_arr);
        }
        return res.status(200).json({ success: true, data: draw_group_data });
    }).catch(err => console.log(err))
}

module.exports = {
    createDrawGroup,
    updateDrawGroup,
    deleteDrawGroup,
    getDrawGroupById,
    getDrawGroupList,
    getDrawGroupDrpdwn
}