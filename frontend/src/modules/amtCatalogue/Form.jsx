
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { inputField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
import apis from '../../api';
const requiredacName = required("Amount Catalogue Name");
const requiredCatAmt = required("Catalogue Amount");
const requiredShortCode = required("Short Code");

class AmountCatalogForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            amt_catalogue : []
        }
    }
    
    componentDidMount = () => { 
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.amtCatalogueRecordFetch(url_params.id).then(res => {
                this.props.initialize( res.data.data);   
            });
        }
    }
    
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ac_name" 
                            id='ac_name'
                            label="Amount Catalogue Name"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredacName]}
                        />
                        <Field
                            type="text"
                            name="ac_amount" 
                            id='ac_amount'
                            label="Catalogue Amount"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredCatAmt]}

                        />
                    </div>
                    <div className="form-row">
                    <Field
                            type="text"
                            name="ac_short_code" 
                            id='ac_short_code'
                            label="Short Code"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredShortCode]}
                        />
                    </div>
                    <FormButtons listUrl={routes.AMOUNT_CATALOG_LIST}/>
                </form>
            </div>
        );
    }
};
export default reduxForm({
    form: 'amount_catalogue_form'
  })(AmountCatalogForm);


