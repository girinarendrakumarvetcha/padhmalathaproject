// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
// // import { inputField } from "../helpers/domcontrols";
// // import apis from '../api';

// class InstallmentIntervalInsert extends Component {
//     constructor(pros){
//         super(pros);
//         this.state = {
           
//         }
//         //this._handleOnChange  = this._handleOnChange.bind(this);
//     }
//     _handleOnChange = async (event,type) => {
        
//         const value = event.target.value;
//         this.setState({ [type]  : value });
//     }

//     _handleIncludeCustomer = (event) => {
//         console.log(event)
//         // const payload = this.state;
//         // await apis.insertInterval(payload).then(res => {
//         //     console.log(res);
//         //     window.alert(`Catalog inserted successfully`)
//         //     // this.setState = {
//         //     //     insinterval_name : '',
//         //     //     insinterval_interval : '',
//         //     //     customer_address : '',
//         //     //     insinterval_short_code : ''
//         //     // }
//         // });
//     }
//     render() {
//         const { insinterval_name, insinterval_interval} = this.state;
//         const { insinterval_short_code} = this.state;
//         return (
//             <div className='form-container'>
//                 <form  onSubmit={this._handleIncludeCustomer}>
//                     <div className="form-row">
//                         <div className="form-group col-md-6">
//                             <label htmlFor="insinterval_name">Name</label>
//                             <input type="text" 
//                                    className="form-control" 
//                                    id="insinterval_name" 
//                                    name="insinterval_name" 
//                                    placeholder="Name"
//                                    value={insinterval_name} 
//                                    onChange={(e) => this._handleOnChange(e,'insinterval_name')} />
//                         </div>
//                         <div className="form-group col-md-6">
//                             <label htmlFor="insinterval_interval">Interval</label>
//                             <input type="Amount" className="form-control" id="insinterval_interval"  name="insinterval_interval" placeholder="Amount" value={insinterval_interval} onChange={(e) => this._handleOnChange(e,'insinterval_interval')} />
//                         </div>
//                     </div>
//                     <div className="form-row">
//                         <div className="form-group col-md-6">
//                             <label htmlFor="insinterval_short_code">Short Code</label>
//                             <input type="text" className="form-control" id="insinterval_short_code"  name="insinterval_short_code" placeholder="Phone number" value={insinterval_short_code} onChange={(e) => this._handleOnChange(e,'insinterval_short_code')} />
//                         </div>
//                     </div>
//                     <button type="button" className="btn btn-primary"  >Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

// InstallmentIntervalInsert = reduxForm({
//     form:'installment_interval'
// })(InstallmentIntervalInsert);

// export default InstallmentIntervalInsert