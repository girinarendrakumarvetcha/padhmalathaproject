
// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { inputField , selectField } from "../../helpers/domcontrols";
// import { required } from "../../helpers/validators";
// import apis from '../../api';
// import { connect } from 'react-redux'
// const requiredlName = required("Group Name");
// const requiredShortCode = required("Short Code");
// const requiredCustomers = required("Customers");


// await apis.customerDropdown().then(customer_dropdown => {
//     this.setState({
//         customer_dropdown : customer_dropdown.data.data,
//     })
// })
// const url_params = this.props.match.params;
// if(url_params.id !== undefined){
//     apis.drawGroupRecordFetch(url_params.id).then(res => {
//         //this.props.initialize( res.data.data); 
//         this.setState({'form_data' :  res.data.data }); 
//         console.log(this.state.form_data);
//         if(typeof res.data.data.group_customers_ids != 'undefined'){
//             const custiomer_ids = res.data.data.group_customers_ids.split(',');
//             const cus_drpdwn_arr = this.state.customer_dropdown;
//             const selected_cus_drpdwn = [];

//             for(var i in cus_drpdwn_arr){
//                 if(custiomer_ids.includes(cus_drpdwn_arr[i]['value'])){
//                     selected_cus_drpdwn.push(cus_drpdwn_arr[i]);
//                 }
//             }
//             this.setState({selected_customer_dropdown : selected_cus_drpdwn});
//         }
//     });
// }
