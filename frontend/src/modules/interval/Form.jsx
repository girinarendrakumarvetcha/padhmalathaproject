
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import apis from '../../api';
import { inputField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
const requiredIntervalName = required("Interval Name");
const requiredShortCode = required("Short Code");
const requiredInterval = required("Interval");

class IntervalForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            interval_data : {}
        }
    }

    componentDidMount = () => { 
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.intervalRecordFetch(url_params.id).then(res => {
                this.props.initialize( res.data.data);   
            });
        }
    }

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
                            //defaultValue={im_data.im_name}
                        />
                        <Field
                            type="text"
                            name="im_interval" 
                            id='im_interval'
                            label="Interval Days"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredInterval]}
                            //defaultValue={im_data.im_interval}

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
                            //defaultValue={im_data.im_short_code}
                        />
                    </div>
                    <FormButtons listUrl={routes.INTERVAL_LIST}/>
                </form>
            </div>
        );
    }
};


// export default reduxForm({
//     form: 'interval_form'
//   })(IntervalForm);
IntervalForm =  reduxForm({
    form: 'interval_form'
  })(IntervalForm);



  export default IntervalForm;