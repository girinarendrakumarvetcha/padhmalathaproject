
import React, { Component } from 'react';
import { Field, initialize, reduxForm } from 'redux-form';
import { inputField , selectField,selectDropdown } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import apis from '../../api';
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';

const requiredAuctionName = required("Auction Name");
const requiredPrintName = required("Print Name");
const requiredShortCode = required("Short Code");
const requiredAmountCatalogue = required("Amount Catalogue");
const requiredInstallments = required("Installments");
const requiredInterval = required("Interval");
const requiredCommssion = required("Commission");
const requiredInstallmentAmount = required("Installment Amount");
const requiredBonusAmount = required("Bonus Amount");
const requiredBeforeWithdrawAmt = required("Before Withdraw Amt");
const requiredAfterWithdrawAmt = required("After Withdraw Amount");
const requiredTotalAmount = required("Total Amount");
const requiredReceivableAmount = required("Receivable Amount");
const requiredFinalPayableAmount = required("Total Amount");


class TrComponent extends Component {
    render(){
        const { rowId , nameClass , index }  = this.props;
        return (
            <tr className={`auction-child-row-${rowId}`}  key={index}>
                <td>
                    <Field
                            type="text"
                            name={`amt_installment_step_no_${rowId}`}
                            id={`amt_installment_step_no_${rowId}`}
                            label="Step Number" 
                            disabled='disabled' 
                            noLabelRequired = {true}
                            component={inputField}
                            //value={rowId}
                            defaultValue={index}
                        />
                </td>
                <td><Field
                            type="text"
                            //name={`amt_receivable_amount[]`} 
                            name={`amt_receivable_amount_${rowId}`}
                            id={`amt_receivable_amount_${rowId}`}
                            label="Receivable Amount" 
                            noLabelRequired = {true}
                            component={inputField}
                            validate={[requiredReceivableAmount]}
                        /></td>
                <td><Field
                            type="text"
                            //name={`amt_payable_amount[]`} 
                            name={`amt_payable_amount_${rowId}`}
                            id={`amt_payable_amount_${rowId}`}
                            label="Payable Amount" 
                            noLabelRequired = {true}
                            component={inputField}
                            validate={[requiredFinalPayableAmount]}
                        /></td>
            </tr>
        );
    }
}

class AuctionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            amt_catalog_data : [],
            amt_catalog_dropdown : [],
            //sel_amt_catalog_dropdown : {value: "5f9ecd79be78dd56edac6dd8", amount: 50000, label: "50 Thousand"},
            sel_amt_catalog_dropdown : '',
            sel_interval_dropdown : {},
            interval_dropdown : [], 
            transaction_data : [],
            trans_arr : []
        }
        
    }
    
    componentDidMount = async () => {
        
        let amt_catalog_data = {};
        let sel_interval_dropdown = {};
        let interval_dropdown_arr = [];
        await apis.amtCatalogueDropdown().then(amt_catalog_dropdown => {    
            // this.setState({
            //     amt_catalog_data : amt_catalog_dropdown.data.data,
            // });
            amt_catalog_data = amt_catalog_dropdown.data.data;
        });

        await apis.intervalDropdown().then(interval_dropdown => {
            // this.setState({
            //     interval_dropdown : interval_dropdown.data.data,
            // })
            interval_dropdown_arr = interval_dropdown.data.data;
        });

        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
          await  apis.auctionRecordFetch(url_params.id).then(res => {
                this.setState({
                    trans_arr : res.data.data.trans_arr
                });  
              
                let auction_form_data = res.data.data;
                //this.props.initialize( res.data.data);  
                var sel_amt_catalog_dropdown = '';
                //var amt_catalog_data = this.state.amt_catalog_data;
                for(var i in amt_catalog_data){
                    if(amt_catalog_data[i]['value'] == res.data.data.ma_amt_catalog_id){
                        sel_amt_catalog_dropdown = amt_catalog_data[i];
                    }
                }
                for(var i in interval_dropdown_arr){
                    if(interval_dropdown_arr[i]['value'] == res.data.data.ma_interval_cycle){
                        sel_interval_dropdown = interval_dropdown_arr[i];
                    }
                }
                auction_form_data['ma_amt_catalog'] = sel_amt_catalog_dropdown;
                //debugger;
                this.props.dispatch(initialize("auction_form", auction_form_data))   
                //this.setState({sel_amt_catalog_dropdown : sel_amt_catalog_dropdown}); 
                // setTimeout(
                //     () => this.setState({
                //         amt_catalog_dropdown : this.state.amt_catalog_data,
                //         sel_amt_catalog_dropdown : sel_amt_catalog_dropdown
                //     }), 
                //     1000
                //   );
                console.log(interval_dropdown_arr)
                this.setState({
                    sel_amt_catalog_dropdown : sel_amt_catalog_dropdown,
                    sel_interval_dropdown : sel_interval_dropdown,
                    amt_catalog_dropdown : amt_catalog_data,
                    interval_dropdown : interval_dropdown_arr
                })
            });
        }
        else{
            this.setState({
                amt_catalog_dropdown : amt_catalog_data,
                interval_dropdown : interval_dropdown_arr
            })
        }
        
    }
    handleInstallmentsChange = (event) => {
        const row_arr = [];
        for(var i=1;i<=event.target.value;i++){
            row_arr.push(`row_${i}`);
        }
        this.setState({trans_arr:row_arr});
    }

    updateAmountCatalogue = (event,props) =>{
        //props.initialize({'ma_total_amount':event.amount});
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_name" 
                            id='ma_name'
                            label="Action Name"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredAuctionName]}
                        />
                        <Field
                            type="text"
                            name="ma_print_name" 
                            id='ma_print_name'
                            label="Print Name"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredPrintName]}

                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_short_code" 
                            id='ma_short_code'
                            label="Short Code"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredShortCode]}
                        />
                        <Field
                            type="text"
                            name="ma_status" 
                            id='ma_status'
                            label="Status"  
                            component={inputField}
                            containerclass='col-md-4'
                        />
                        {this.state.amt_catalog_dropdown.length && 

                        <Field
                            type="text"
                            name="ma_amt_catalog" 
                            id='ma_amt_catalog'
                            label="Amount Catalougue"  
                            component={selectField} 
                            containerclass='col-md-4'
                            defaultValue={JSON.stringify(this.state.sel_amt_catalog_dropdown)} 
                            data={JSON.stringify(this.state.amt_catalog_dropdown)}
                            // defaultValue= {JSON.stringify({'value': '5fc22a3aa629931ccc45661d', 'amount': 100000, 'label': '1 Lakh Catalogue'})}
                            // data = {JSON.stringify([{"value":"5f9ecd79be78dd56edac6dd8","amount":50000,"label":"50 Thousand"},{"value":"5fc22a20a629931ccc45661c","amount":200000,"label":"2 Lakh"},{"value":"5fc22a3aa629931ccc45661d","amount":100000,"label":"1 Lakh Catalogue"},{"value":"5fe7ebe5f9219400d852f702","amount":300000,"label":"3 Lakhs"}])}
                            validate={[requiredAmountCatalogue]}
                            onChange = {(e) => this.updateAmountCatalogue(e, this.props)}
                            />
                        }
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_installments" 
                            id='ma_installments'
                            label="Installments"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallments]}
                            onChange = {this.handleInstallmentsChange}
                        />
                        { this.state.interval_dropdown.length && 
                        <Field
                            type="text"
                            name="ma_interval_period" 
                            id='ma_interval_period'
                            label="Interval"  
                            component={selectField}
                            defaultValue={JSON.stringify(this.state.sel_interval_dropdown)}
                            data={JSON.stringify(this.state.interval_dropdown)}
                            containerclass='col-md-4'
                            validate={[requiredInterval]}
                        />  
                        }
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_commission" 
                            id='ma_commission'
                            label="Commission"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredCommssion]}
                        />
                        <Field
                            type="text"
                            name="ma_installment_amount" 
                            id='ma_installment_amount'
                            label="Installment Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallmentAmount]}
                        />
                        <Field
                            type="text"
                            name="ma_bonus_amount" 
                            id='ma_bonus_amount'
                            label="Bonus Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredBonusAmount]}
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_before_withdraw_amount" 
                            id='ma_before_withdraw_amount'
                            label="Before Withdraw Amt"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredBeforeWithdrawAmt]}
                        />
                        <Field
                            type="text"
                            name="ma_after_withdraw_amount" 
                            id='ma_after_withdraw_amount'
                            label="After Withdraw Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredAfterWithdrawAmt]}
                        />
                        <Field
                            type="text"
                            name="ma_total_amount" 
                            id='ma_total_amount'
                            label="Total Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredTotalAmount]}
                        />
                    </div>
                    {this.state.trans_arr.length > 0 && 
                        <div className="form-row"> 
                        <h2>Details</h2>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Instal. Step No.</th>
                                    <th>Receivable Amt.</th>
                                    <th>Final Amt.</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.trans_arr.map((val,index) => (
                                
                                <TrComponent  rowId={index} index={index} key={index}  />
                                ))}
                            </tbody>
                        </table>
                    </div>
                            }
                    <FormButtons listUrl={routes.CHIT_MASTER_LIST}/>
                </form>
            </div>
        );
    }
};
export default reduxForm({
    form: 'auction_form'
  })(AuctionForm);
