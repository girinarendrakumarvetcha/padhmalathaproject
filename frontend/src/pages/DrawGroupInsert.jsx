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
        await apis.insertGroup(payload).then(res => {
            console.log(res);
            window.alert(`Catalog inserted successfully`)
            // this.setState = {
            //     group_name : '',
            //     group_customers : '',
            //     customer_address : '',
            //     group_short_code : ''
            // }
        });
    }
    render() {
        const { group_name, group_customers} = this.state;
        const { group_short_code} = this.state;
        return (
            <div className='form-container'>
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="group_name">Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="group_name" 
                                   name="group_name" 
                                   placeholder="Name"
                                   value={group_name} 
                                   onChange={(e) => this._handleOnChange(e,'group_name')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="group_short_code">Short Code</label>
                            <input type="text" className="form-control" id="group_short_code"  name="group_short_code" placeholder="Phone number" value={group_short_code} onChange={(e) => this._handleOnChange(e,'group_short_code')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="group_customers">Short Code</label>
                            <select className="form-control" id="group_customers" multiple name="group_customers" placeholder="Customers" value={group_customers} onChange={(e) => this._handleOnChange(e,'group_short_code')}>
                                <option value=''>No data</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this._handleIncludeCustomer} >Submit</button>
                </form>
            </div>
        )
    }
}

export default AmountCatalogInsert