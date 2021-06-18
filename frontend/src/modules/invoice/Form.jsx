
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { inputField , selectField  , viewField} from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import apis from '../../api';
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
import DrawInvoicePaymentList from '../../modules/payment/List';

const requiredAuctionName = required("Auction Name");
const requiredPrintName = required("Print Name");
const requiredShortCode = required("Short Code");
const requiredInstallments = required("Installments");

class DrawInvoiceForm extends Component {
    constructor(props){
        super(props);
        this.state = {
           di_data : [],
           parID : ''
        }
    }

    componentDidMount = async () => {
        // const url_params = this.props.match.params;
        // if(url_params.id !== undefined){
        //   await  apis.drawInvoiceRecordFetch(url_params.id).then(res => {
        //     console.log(res.data.data);    
            
        //         this.props.initialize( res.data.data); 
        //     });
        // }        
    }

    render(){
        //const { handleSubmit } = this.props;
        const {
            match: {
              params: { id, parID }
            },
            handleSubmit
          } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="di_installment_step_no" 
                            id='di_installment_step_no'
                            label="Installment No."  
                            component={viewField}
                            containerclass='col-md-2'
                        />
                        <Field
                            type="text"
                            name="di_draw_master" 
                            id='di_draw_master'
                            label="Draw Name"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_customer_name" 
                            id='di_customer_name'
                            label="Customet Name"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_payment_status" 
                            id='di_payment_status'
                            label="Payment Status"  
                            component={inputField}
                            containerclass='col-md-4'
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="di_after_withdraw" 
                            id='di_after_withdraw'
                            label="After Withdraw"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                       
                       <Field
                            type="text"
                            name="di_bonus_amount" 
                            id='di_bonus_amount'
                            label="Bonus Amount"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_before_withdraw" 
                            id='di_before_withdraw'
                            label="Before Withdraw"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_payable_amount" 
                            id='di_after_widi_payable_amountthdraw'
                            label="Payable Amount"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="di_payment_date" 
                            id='di_payment_date'
                            label="Payable Amount"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_paid_date" 
                            id='di_paid_date'
                            label="Paid Date"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_paid_amount" 
                            id='di_paid_amount'
                            label="Paid Amount"  
                            component={viewField}
                            containerclass='col-md-3'
                        />
                        <Field
                            type="text"
                            name="di_status" 
                            id='di_status'
                            label="Status"  
                            component={viewField}
                            containerclass='col-md-3'
                        />                       
                    </div>
                    <DrawInvoicePaymentList  {...this.props} />
                    <FormButtons listUrl={routes.DRAW_INVOICE_LIST_URL+`/${parID}`}/>
                </form>
            </div>
        );
    }
};
// export default reduxForm({
//     form: 'draw_invoice_form'
//   })(DrawInvoiceForm);
DrawInvoiceForm = reduxForm({
    form: 'draw_invoice_form',
    enableReinitialize: true
})(DrawInvoiceForm);

const mapStateToProps = state => {
    return {};
  };
  
  export default connect(mapStateToProps)(DrawInvoiceForm);
