
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { routes } from "../../config/routes";
import { inputField } from "../../helpers/domcontrols";
import FormButtons from '../../Layout/AppFormButtons';
import { required ,validEmail } from "../../helpers/validators";

const requiredCustomerName = required("Customer Name");
const requiredEmail = required("Email");
const requiredPhone = required("Phone Number");


class CustomerForm extends Component {
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field  type="text"
                                name="customer_name" 
                                id='customer_name'
                                label="Customer Name"  
                                component={inputField}
                                containerclass='col-md-6'
                                validate={[requiredCustomerName]}
                        />
                        <Field
                            type="text"
                            name="customer_email" 
                            id='customer_email'
                            label="Email"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredEmail , validEmail]}
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="customer_phonenumber" 
                            id='customer_phonenumber'
                            label="Phone Number"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredPhone]}
                        />
                         <Field
                            type="text"
                            name="customer_address" 
                            id='customer_address'
                            label="Address"  
                            component={inputField}
                            containerclass='col-md-6'
                        />
                    </div>
                    <FormButtons listUrl={routes.CUSTOMER_LIST}/>
                </form>
            </div>
        );
    }
};

CustomerForm = reduxForm({
    form: 'customer_form',
    enableReinitialize: true
})(CustomerForm);


const mapStateToProps = state => {
    return {};
  };
  
  export default connect(mapStateToProps)(CustomerForm);

