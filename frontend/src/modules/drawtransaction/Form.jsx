
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { inputField,viewField, dateField ,selectField } from "../../helpers/domcontrols";
import { required ,validEmail } from "../../helpers/validators";
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
const requiredDrawTransactionId = required("Draw Transaction Id");

class DrawTransactionForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            amt_catalogue : []
        }
    }

    componentDidMount = () => { 
        const url_params = this.props.match.params;
        this.props.initialize({ dwt_id: url_params.id });

        //this.props.dispatch(change('myFormName', 'anotherField', 'value'));

        // if(url_params.id !== undefined){
        //     apis.customerRecordFetch(url_params.id).then(res => {
        //         this.props.initialize( res.data.data);   
        //     });
        // }
    }

    render(){
        const {
            match: {
              params: { id, parID }
            },
            handleSubmit
          } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <Field  type="hidden"
                            name="dwt_id" 
                            id='dwt_id'
                            label="Draw Transaction Id"  
                            defaultValue=  { this.props.match.params.id}
                            //value={ this.props.match.params.id}
                            noLabelRequired = {true}
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredDrawTransactionId]}
                    />
                    <div className="form-row">
                        <Field
                            type="text"
                            name="dwt_contact_name" 
                            id='dwt_contact_name'
                            label="Customer Name"  
                            component={viewField}
                            containerclass='col-md-4'                            
                        />
                        <Field
                            type="text"
                            name="dwt_draw_name" 
                            id='dwt_draw_name'
                            label="Draw Name"  
                            component={viewField}
                            containerclass='col-md-4'
                        />
                        <Field
                            type="text"
                            name="dwt_draw_book_code" 
                            id='dwt_draw_book_code'
                            label="Book Code"
                            component={viewField}
                            containerclass='col-md-4'
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="number"
                            name="dwt_installment_step" 
                            id='dwt_installment_step'
                            label="Installment Step"  
                            component={inputField}
                            containerclass='col-md-4'
                            // onChange = {(e) => { }
                        />
                        <Field
                            type="text"
                            name="dwt_actual_withdraw_date" 
                            id='dwt_actual_withdraw_date'
                            label="Actual Withdraw Date"  
                            component={dateField}
                            containerclass='col-md-4'
                        />
                        <Field
                            type="text"
                            name="dwt_withdraw_date" 
                            id='dwt_withdraw_date'
                            label="Withdraw Date"  
                            component={dateField}
                            containerclass='col-md-4'
                        />
                        <Field
                            type="text"
                            name="dwt_is_withdrawed" 
                            id='dwt_is_withdrawed'
                            label="Is Withdrawed"  
                            //component={selectField}
                            component={inputField}
                            //defaultValue = {JSON.stringify(this.state.sel_auction_dropdown)}
                            //data={JSON.stringify(this.props.auction_dropdown)}
                            containerclass='col-md-4'
                            //validate={[requiredAuctionMaster]}
                            //onChange = { (e) => {this.handleChangeAuction(e,this.props)}}
                        />
                        <Field
                            type="text"
                            name="dwt_receivable_amount" 
                            id='dwt_receivable_amount'
                            label="Receivable Amount"  
                            component={viewField}
                            containerclass='col-md-4'
                        />
                        <Field
                            type="text"
                            name="dwt_payable_amount" 
                            id='dwt_payable_amount'
                            label="Payable Amount"
                            component={viewField}
                            containerclass='col-md-4'
                        />
                    </div>
                    
                    <FormButtons listUrl={routes.DRAW_MASTER_TRANS_LIST_URL+`/${parID}`}/>
                </form>
            </div>
        );
    }
};
export default reduxForm({
    form: 'draw_invoice_payment_form'
  })(DrawTransactionForm);


