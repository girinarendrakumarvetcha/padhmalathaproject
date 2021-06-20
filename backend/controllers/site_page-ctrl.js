const Draw_invoice = require('../models/draw_invoice-model.js');
const Draw_master = require('../models/draw_master-model.js');
const Draw_master_trans = require('../models/draw_master_trans-model.js');


getSitePageSearch = async (req, res) => {
    console.log(req.params.q);
    await Draw_master.aggregate([
        {
            $addFields: {
                drawMasterId: {
                    $toString: "$_id"
                },
                
            }
        },
        {
            $lookup: 
            {
                from: "draw_master_trans",
                let: {
                    drawMasterId: "$drawMasterId"
                },
                pipeline: [
                    {
                        "$addFields": {
                            "drawMasterTransId": {
                                $toString: "$_id"
                            }
                        }
                    },
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$drawMasterId", "$$drawMasterId"]
                                    }
                                ]
                            }
                        }
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
                    },
                    {
                            $unwind : '$customer_details'
                    },
                    {
                        $lookup: 
                        {
                            from: "draw_invoice",
                            let: {
                                drawMasterTransId: "$drawMasterTransId"
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $eq: ["$drawMasterTransId", "$$drawMasterTransId"]
                                                }
                                            ]
                                        }
                                    }
                                },
                                
                            ],
                            as: "draw_invoice"
                        }
                    },
                    //                    {
                    //                        $match: {
                    //                            drawBookCode: 'DWPD1bk1'
                    //                        }
                    //                    }
                ],
                as: "draw_book"
            }
        },
        {
            $match: {
                $or: [
                    {
                        shortCode: { $regex : req.params.q , $options: 'i' }
                    },
                    // {
                    //     //draw_book : { $elemMatch : { drawBookCode : { $regex : req.params.q , $options: 'i' } } }
                    //     draw_book : { $elemMatch : { drawBookCode : req.params.q } }
                    // }
                ]
            },
            
        },
    ]).exec((err, site_page_search) => {
        if (err) {
         return res.status(400).json({ success: false, error: err })
     }
     //console.log(JSON.stringify(site_page_search));
     if (!site_page_search) {
         return res
             .status(404)
             .json({ success: false, error: `No data found..!` })
     }
     return res.status(200).json({ success: true, data: site_page_search });
 });
}

module.exports = {
    getSitePageSearch
}