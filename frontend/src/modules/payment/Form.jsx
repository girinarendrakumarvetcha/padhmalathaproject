
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { inputField , dateField } from "../../helpers/domcontrols";
import { required ,validEmail } from "../../helpers/validators";
import apis from '../../api';
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
const requiredPaymentAmount = required("Payment Amount");
const requiredPaymentDate = required("Payment Date");

class DrawInvoicePaymentForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            amt_catalogue : []
        }
    }

    componentDidMount = () => { 

        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;
        // const url_params = this.props.match.params;
        // this.props.initialize({ dip_draw_invoice: url_params.id });

        //this.props.dispatch(change('myFormName', 'anotherField', 'value'));

        // if(url_params.id !== undefined){
        //     apis.customerRecordFetch(url_params.id).then(res => {
        //         this.props.initialize( res.data.data);   
        //     });
        // }
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <Field  type="hidden"
                            name="dip_draw_invoice" 
                            id='dip_draw_invoice'
                            label="Invoice Id"  
                            // defaultValue=  { this.props.match.params.id}
                            // value={ this.props.match.params.id}
                            noLabelRequired = {true}
                            component={inputField}
                            containerclass='col-md-6'
                            
                    />
                    <div className="form-row">
                        <Field  type="text"
                                name="dip_payment_amount" 
                                id='dip_payment_amount'
                                label="Payment Amount"  
                                component={inputField}
                                containerclass='col-md-6'
                                validate={[requiredPaymentAmount]}
                        />
                        <Field
                            type="text"
                            name="dip_payment_date" 
                            id='dip_payment_date'
                            label="Date"  
                            component={dateField}
                            containerclass='col-md-6'
                            validate={[requiredPaymentDate]}
                        />
                    </div>
                    <FormButtons listUrl={routes.DRAW_INVOICE_PAYMENT_LIST}/>
                </form>
            </div>
        );
    }
};
// export default reduxForm({
//     form: 'draw_invoice_payment_form'
//   })(DrawInvoicePaymentForm);


DrawInvoicePaymentForm = reduxForm({
    form: 'draw_invoice_payment_form',
    enableReinitialize: true
})(DrawInvoicePaymentForm);

const mapStateToProps = state => {
    return {};
  };
  
  export default connect(mapStateToProps)(DrawInvoicePaymentForm);