
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { inputField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
const requiredIntervalName = required("Interval Name");
const requiredShortCode = required("Short Code");
const requiredInterval = required("Interval");

class IntervalForm extends Component {
    render(){
        
        const { handleSubmit  } = this.props;      

        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="im_name" 
                            id='im_name'
                            label="Interval Name"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredIntervalName]}
                        />
                        <Field
                            type="text"
                            name="im_interval" 
                            id='im_interval'
                            label="Interval Days"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredInterval]}
                        />
                    </div>
                    <div className="form-row">
                    <Field
                            type="text"
                            name="im_short_code" 
                            id='im_short_code'
                            label="Short Code"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredShortCode]}
                        />
                    </div>
                    <FormButtons listUrl={routes.INTERVAL_LIST}/>
                </form>
            </div>
        );
    }
};


IntervalForm = reduxForm({
    form: 'interval_form',
    enableReinitialize: true
})(IntervalForm);

const mapStateToProps = state => {
    return {};
  };
  
  export default connect(mapStateToProps)(IntervalForm);
