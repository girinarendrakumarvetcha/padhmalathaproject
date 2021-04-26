
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { inputField, selectField, dateField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import apis from '../../api';
 import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';

const requiredName = required("Draw Name");
const requiredPrintName = required("Print Name");
const requiredShortCode = required("Short Code");
const requiredAuctionMaster = required("Auction Master");
const requiredDrawDate = required("Draw Date");
const requiredDrawGroup = required("Draw Group");
const requiredDrawAmount = required("Draw Amount");
const requiredAmountCatalogue = required("Amount Catalogue");
const requiredInstallments = required("Installments");
const requiredInterval = required("Interval Cycle");
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
            <tr className={`drawlog-child-row-${rowId}`}  key={index}>
                <td>
                    <Field
                            type="text"
                            name={`dl_installment_step_no_${rowId}`}
                            id={`dl_installment_step_no_${rowId}`}
                            label="Step Number" 
                            disabled='disabled' 
                            noLabelRequired = {true}
                            component={inputField}
                            defaultValue={index}
                        />
                </td>
                <td><Field
                            type="text"
                            name={`dl_receivable_amount_${rowId}`}
                            id={`dl_receivable_amount_${rowId}`}
                            label="Receivable Amount" 
                            noLabelRequired = {true}
                            component={inputField}
                            validate={[requiredReceivableAmount]}
                        /></td>
                <td><Field
                            type="text"
                            name={`dl_payable_amount_${rowId}`}
                            id={`dl_payable_amount_${rowId}`}
                            label="Payable Amount" 
                            noLabelRequired = {true}
                            component={inputField}
                            validate={[requiredFinalPayableAmount]}
                        /></td>
            </tr>
        );
    }
}

class DrawLogForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            amt_catalog_dropdown : [],
            interval_dropdown : [],
            draw_group_dropdown : [], 
            transaction_data : [],
            auction_dropdown : [],
            trans_arr : []
        }
    }

    handleChangeAuction = async(event,props) => {
        
        await  apis.getAuctionDetailsById(event.value).then(res => {
            
            console.log(res.data.data);
            const row_arr = [];
            for(var i=1;i<=res.data.data.dl_installments;i++){
                row_arr.push(`row_${i}`);
            }
            
            this.setState({trans_arr:row_arr});
            //this.setState(res.data.data);
            debugger;
            console.log(this.state);
            //this.props.dispatch(initialize("draw_log_form", res.data.data));   
            this.props.initialize( res.data.data);  
            
        });     

        console.log(event);
        // props.initialize(event);
        //await apis.


    }

    componentDidMount = async () => {
        
        await apis.amtCatalogueDropdown().then(amt_catalog_dropdown => {
            
            this.setState({
                amt_catalog_dropdown : amt_catalog_dropdown.data.data,
            })
        });
        await apis.drawGroupDropdown().then(draw_group_dropdown => {
            
            this.setState({
                draw_group_dropdown : draw_group_dropdown.data.data,
            })
        });

        await apis.intervalDropdown().then(interval_dropdown => {
            this.setState({
                interval_dropdown : interval_dropdown.data.data,
            })
        })
        await apis.auctionDropdown().then(auction_dropdown => {
            this.setState({
                auction_dropdown : auction_dropdown.data.data,
            })
        })
    }
    
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                <div className="form-row">
                        <Field
                            type="text"
                            name="dl_name" 
                            id='dl_name'
                            label="Draw Name"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredName]}
                        />
                        <Field
                            type="text"
                            name="dl_print_name" 
                            id='dl_print_name'
                            label="Print Name"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredPrintName]}

                        />
                        <Field
                            type="text"
                            name="dl_short_code" 
                            id='dl_short_code'
                            label="Short Code"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredShortCode]}
                        />
                    </div>
                    <div className="form-row">
                    <Field
                            type="text"
                            name="dl_draw_group" 
                            id='dl_draw_group'
                            label="Draw Group"  
                            component={selectField}
                            data={JSON.stringify(this.state.draw_group_dropdown)}
                            containerclass='col-md-4'
                            validate={[requiredDrawGroup]}
                        />
                        <Field
                            type="text"
                            name="dl_draw_date" 
                            id='dl_draw_date'
                            label="Draw Date"  
                            component={dateField}
                            containerclass='col-md-4'
                            validate={[requiredDrawDate]}
                        />
                        <Field
                            type="text"
                            name="dl_auction_master" 
                            id='dl_auction_master'
                            label="Auction Master"  
                            component={selectField}
                            data={JSON.stringify(this.state.auction_dropdown)}
                            containerclass='col-md-4'
                            validate={[requiredAuctionMaster]}
                            onChange = { (e) => {this.handleChangeAuction(e,this.props)}}
                        />
                        
                    </div>
                    <div className='form-row'>
                        <Field
                            type="text"
                            name="dl_installments" 
                            id='dl_installments'
                            label="Installments"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallments]}
                        />
                        <Field
                            type="text"
                            name="dl_draw_amount" 
                            id='dl_draw_amount'
                            label="Draw Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredDrawAmount]}
                        />
                        
                        <Field
                            type="text"
                            name="dl_amt_catalog" 
                            id='dl_amt_catalog'
                            label="Amount Catalougue"  
                            component={selectField}
                            data={JSON.stringify(this.state.amt_catalog_dropdown)}
                            containerclass='col-md-4'
                            validate={[requiredAmountCatalogue]}
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="dl_commission" 
                            id='dl_commission'
                            label="Commission"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredCommssion]}
                        />
                        {/* <Field
                            type="text"
                            name="dl_total_commission" 
                            id='dl_total_commission'
                            label="Totoal Commission"  
                            component={inputField}
                            containerclass='col-md-4'
                        /> */}
                        <Field
                            type="text"
                            name="dl_installment_amount" 
                            id='dl_installment_amount'
                            label="Installment Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallmentAmount]}
                        />
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="dl_before_withdraw_amount" 
                            id='dl_before_withdraw_amount'
                            label="Before Withdraw Amt"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredBeforeWithdrawAmt]}
                        />
                        <Field
                            type="text"
                            name="dl_after_withdraw_amount" 
                            id='dl_after_withdraw_amount'
                            label="After Withdraw Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredAfterWithdrawAmt]}
                        />
                        <Field
                            type="text"
                            name="dl_total_amount" 
                            id='dl_total_amount'
                            label="Total Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredTotalAmount]}
                        />
                    </div>
                    <div className='form-row'>
                    <Field
                            type="text"
                            name="dl_bonus_amount" 
                            id='dl_bonus_amount'
                            label="Bonus Amount"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredBonusAmount]}
                        />
                    <Field
                            type="text"
                            name="dl_interval_cycle" 
                            id='dl_interval_cycle'
                            label="Interval"  
                            component={selectField}
                            data={JSON.stringify(this.state.interval_dropdown)}
                            containerclass='col-md-4'
                            validate={[requiredInterval]}
                        />
                    <Field
                            type="text"
                            name="dl_status" 
                            id='dl_status'
                            label="Status"  
                            component={ Field}
                            containerclass='col-md-4'
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
                    <FormButtons listUrl={routes.DRAW_MASTER_LIST}/>
                </form>
            </div>
        );
    }
};
export default reduxForm({
    form: 'draw_log_forms'
  })(DrawLogForm);
