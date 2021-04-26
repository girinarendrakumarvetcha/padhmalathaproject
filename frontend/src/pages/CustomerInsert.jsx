import React, { Component } from 'react';
import apis from '../api';

class CustomerInsert extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            customer_name : 'Customer 1',
            customer_email : 'customer_1@getnada.com',
            customer_address : 'test address 1',
            customer_phonenumber : '9440223284'
        }
        //this._handleOnChange  = this._handleOnChange.bind(this);
    }
    _handleOnChange = async (event,type) => {
        
        const value = event.target.value;
        this.setState({ [type]  : value });
    }

    _handleIncludeCustomer = async (event) => {
        const payload = this.state;
        await apis.insertCustomer(payload).then(res => {
            console.log(res);
            window.alert(`Movie inserted successfully`)
            // this.setState = {
            //     customer_name : '',
            //     customer_email : '',
            //     customer_address : '',
            //     customer_phonenumber : ''
            // }
        });
    }
    render() {
        const { customer_name, customer_email} = this.state;
        const { customer_phonenumber, customer_address} = this.state;
        return (
            <div className='form-container'>
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="customer_name">Password</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="customer_name" 
                                   name="customer_name" 
                                   placeholder="Name"
                                   value={customer_name} 
                                   onChange={(e) => this._handleOnChange(e,'customer_name')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="customer_email">Email</label>
                            <input type="email" className="form-control" id="customer_email"  name="customer_email" placeholder="Email" value={customer_email} onChange={(e) => this._handleOnChange(e,'customer_email')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="customer_phonenumber">Phone Number</label>
                            <input type="text" className="form-control" id="customer_phonenumber"  name="customer_phonenumber" placeholder="Phone number" value={customer_phonenumber} onChange={(e) => this._handleOnChange(e,'customer_phonenumber')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="customer_email">Address</label>
                            <input type="text" className="form-control" id="customer_address" name="customer_address"  placeholder="Address" value={customer_address} onChange={(e) => this._handleOnChange(e,'customer_address')}/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this._handleIncludeCustomer} >Submit</button>
                </form>
            </div>
        )
    }
}

export default CustomerInsert