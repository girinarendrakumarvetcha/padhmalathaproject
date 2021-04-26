import React, { Component } from 'react';
import apis from '../api';

class AmountCatalogInsert extends Component {
    constructor(pros){
        super(pros);
        this.state = {
           
        }
        //this._handleOnChange  = this._handleOnChange.bind(this);
    }
    _handleOnChange = async (event,type) => {
        
        const value = event.target.value;
        this.setState({ [type]  : value });
    }

    _handleIncludeCustomer = async (event) => {
        const payload = this.state;
        await apis.insertAmtCatalog(payload).then(res => {
            console.log(res);
            window.alert(`Catalog inserted successfully`)
            // this.setState = {
            //     amtcat_name : '',
            //     amtcat_name_amount : '',
            //     customer_address : '',
            //     amtcat_short_code : ''
            // }
        });
    }
    render() {
        const { amtcat_name, amtcat_name_amount} = this.state;
        const { amtcat_short_code} = this.state;
        return (
            <div className='form-container'>
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="amtcat_name">Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="amtcat_name" 
                                   name="amtcat_name" 
                                   placeholder="Name"
                                   value={amtcat_name} 
                                   onChange={(e) => this._handleOnChange(e,'amtcat_name')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="amtcat_name_amount">Amount</label>
                            <input type="Amount" className="form-control" id="amtcat_name_amount"  name="amtcat_name_amount" placeholder="Amount" value={amtcat_name_amount} onChange={(e) => this._handleOnChange(e,'amtcat_name_amount')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="amtcat_short_code">Short Code</label>
                            <input type="text" className="form-control" id="amtcat_short_code"  name="amtcat_short_code" placeholder="Phone number" value={amtcat_short_code} onChange={(e) => this._handleOnChange(e,'amtcat_short_code')} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this._handleIncludeCustomer} >Submit</button>
                </form>
            </div>
        )
    }
}

export default AmountCatalogInsert