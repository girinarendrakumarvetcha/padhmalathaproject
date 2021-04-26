import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { inputField } from "../helpers/domcontrols";
import apis from '../api';

class InstallmentIntervalInsert extends Component {
    constructor(pros){
        super(pros);
        this.state = {
                insinterval_name : 'Test ',
                insinterval_interval : '15',
                insinterval_short_code : 'ABC123'
        }
        
    }
    _handleOnChange = async (event,type) => {
        
        const value = event.target.value;
        this.setState({ [type]  : value });
    }

    handleIncludeCustomer = (data) => {
        alert(data);
        debugger;
        const payload = this.state;
        apis.insertInterval(payload).then(res => {
            console.log(res);
            window.alert(`Catalog inserted successfully`)
        });
    }
    render() {
        const { insinterval_name, insinterval_interval} = this.state;
        const { insinterval_short_code} = this.state;
        return (
            <div className='form-container'>
                <form  onSubmit={(data) => this.handleIncludeCustomer(data)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="insinterval_name">Name</label>
                            <Field
                                name="insinterval_name" 
                                type="text"
                                id='insinterval_name'
                                component={inputField}
                                value={insinterval_name} 
                                label="Interval Name"  
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="insinterval_interval">Interval</label>
                            <input type="Amount" className="form-control" id="insinterval_interval"  name="insinterval_interval" placeholder="Amount" value={insinterval_interval} onChange={(e) => this._handleOnChange(e,'insinterval_interval')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="insinterval_short_code">Short Code</label>
                            <input type="text" className="form-control" id="insinterval_short_code"  name="insinterval_short_code" placeholder="Phone number" value={insinterval_short_code} onChange={(e) => this._handleOnChange(e,'insinterval_short_code')} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary"  >Submit</button>
                </form>
            </div>
        )
    }
}

InstallmentIntervalInsert = reduxForm({
    form:'installment_interval'
})(InstallmentIntervalInsert);

export default (InstallmentIntervalInsert);