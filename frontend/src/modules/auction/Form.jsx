
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, initialize, reduxForm , formValues } from 'redux-form';
import { inputField , selectField,selectDropdown } from "../../helpers/domcontrols";
import { setTransDataRequest } from '../../actions/auction';
import { checkArray , getFromPrintName } from "../../helpers/system_callbacks";
import { required } from "../../helpers/validators";
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';

const requiredAuctionName = required("Auction Name");
const requiredPrintName = required("Print Name");
const requireDefineType = required("Define Type");
const requiredShortCode = required("Short Code");
const requiredAmountCatalogue = required("Amount Catalogue");
const requiredInstallments = required("Installments");
const requiredInterval = required("Interval");
const requiredCommssion = required("Commission");
const requiredInstallmentAmount = required("Installment Amount");
const requiredBonusAmount = required("Bonus Amount");
const requiredBeforeWithdrawAmt = required("Before Withdraw Amt");
const requiredAfterWithdrawAmt = required("After Withdraw Amount");
const requiredAuctionAmount = required("Auction Amount");
const requiredReceivableAmount = required("Receivable Amount");
const requiredFinalPayableAmount = required("Total Amount");
const requiredStatus = required("Status");


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
                            readOnly =  {true} 
                            noLabelRequired = {true}
                            component={inputField}
                            value={rowId}
                            defaultValue={rowId}
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
        //debugger;
        this.state = {
            shortCode : '',
            amt_catalog_data : [],
            amt_catalog_dropdown : [],
            sel_amt_catalog_dropdown : {},
            sel_interval_dropdown : {},
            interval_dropdown : [], 
            auction_type : [], 
            sel_auction_type :{}, 
            transaction_data : [],
            trans_arr : []
        }
        
    }

    static getDerivedStateFromProps = (props, state) => { 
        return {
            //shortCode : props.ShortCode,
            auction_type : props.auction_type,
            sel_auction_type : props.sel_auction_type,
            amt_catalog_dropdown : props.amt_catalog_dropdown,
            sel_amt_catalog_dropdown : props.sel_amt_catalog_dropdown,
            interval_period : props.interval_period,
            sel_interval_period : props.sel_interval_period,
            status_dropdown : props.status_dropdown,
            sel_status_dropdown : props.sel_status_dropdown,
            trans_arr : props.trans_arr
        };
    }

    componentDidMount = async () => {
        
        // let amt_catalog_data = {};
        // let sel_interval_dropdown = {};
        // let interval_dropdown_arr = [];
        // await apis.amtCatalogueDropdown().then(amt_catalog_dropdown => {    
        //     // this.setState({
        //     //     amt_catalog_data : amt_catalog_dropdown.data.data,
        //     // });
        //     amt_catalog_data = amt_catalog_dropdown.data.data;
        // });

        // await apis.intervalDropdown().then(interval_dropdown => {
        //     // this.setState({
        //     //     interval_dropdown : interval_dropdown.data.data,
        //     // })
        //     interval_dropdown_arr = interval_dropdown.data.data;
        // });

        // const url_params = this.props.match.params;
        // if(url_params.id !== undefined){
        //   await  apis.auctionRecordFetch(url_params.id).then(res => {
        //         this.setState({
        //             trans_arr : res.data.data.trans_arr
        //         });  
              
        //         let auction_form_data = res.data.data;
        //         //this.props.initialize( res.data.data);  
        //         var sel_amt_catalog_dropdown = '';
        //         //var amt_catalog_data = this.state.amt_catalog_data;
        //         for(var i in amt_catalog_data){
        //             if(amt_catalog_data[i]['value'] == res.data.data.ma_amt_catalog_id){
        //                 sel_amt_catalog_dropdown = amt_catalog_data[i];
        //             }
        //         }
        //         for(var i in interval_dropdown_arr){
        //             if(interval_dropdown_arr[i]['value'] == res.data.data.ma_interval_cycle){
        //                 sel_interval_dropdown = interval_dropdown_arr[i];
        //             }
        //         }
        //         auction_form_data['ma_amt_catalog'] = sel_amt_catalog_dropdown;
        //         //debugger;
        //         this.props.dispatch(initialize("auction_form", auction_form_data))   
        //         //this.setState({sel_amt_catalog_dropdown : sel_amt_catalog_dropdown}); 
        //         // setTimeout(
        //         //     () => this.setState({
        //         //         amt_catalog_dropdown : this.state.amt_catalog_data,
        //         //         sel_amt_catalog_dropdown : sel_amt_catalog_dropdown
        //         //     }), 
        //         //     1000
        //         //   );
        //         console.log(interval_dropdown_arr)
        //         this.setState({
        //             sel_amt_catalog_dropdown : sel_amt_catalog_dropdown,
        //             sel_interval_dropdown : sel_interval_dropdown,
        //             amt_catalog_dropdown : amt_catalog_data,
        //             interval_dropdown : interval_dropdown_arr
        //         })
        //     });
        // }
        // else{
        //     this.setState({
        //         amt_catalog_dropdown : amt_catalog_data,
        //         interval_dropdown : interval_dropdown_arr
        //     })
        // }
        
    }
    handleInstallmentsChange = (event,props) => {
        
        props.change('ma_defined_installments',event.target.value);

        //console.log('asdf');
        const row_arr = [];
        for(var i=1;i<=event.target.value;i++){
            row_arr.push(`row_${i}`);
        }

        props.dispatch(setTransDataRequest(row_arr));
        props.change('trans_arr',row_arr);
        
        //this.setState({trans_arr:row_arr});
    }

    updateAmountCatalogue = (event,props) =>{
        props.change('ma_auction_amount',event.amount);
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
                            containerclass='col-md-4'
                            validate={[requiredAuctionName]}
                            onChange = {(e) => { getFromPrintName(e,this.props,"ma_print_name");}}
                        />
                        <Field
                            type="text"
                            name="ma_print_name" 
                            id='ma_print_name'
                            label="Print Name"  
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredPrintName]}

                        />
                        <Field
                            type="text"
                            name="ma_short_code" 
                            id='ma_short_code'
                            label="Short Code"
                            value = {this.state.shortCode}  
                            readOnly = {true}   
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredShortCode]}
                        />
                        
                    </div>
                    <div className="form-row">
                        <Field
                            type="text"
                            name="ma_define_type" 
                            id='ma_define_type'
                            label="Define Type"  
                            component={selectField}
                            containerclass='col-md-4'
                            defaultValue={JSON.stringify(this.state.sel_auction_type)} 
                            data={JSON.stringify(this.state.auction_type)}
                            validate={[requireDefineType]}
                            /> 
                            <Field
                                type="text"
                                name="ma_amt_catalog" 
                                id='ma_amt_catalog'
                                label="Amount Catalougue"  
                                component={selectField} 
                                containerclass='col-md-4'
                                defaultValue={JSON.stringify(this.state.sel_amt_catalog_dropdown)} 
                                data={JSON.stringify(this.state.amt_catalog_dropdown)}
                                validate={[requiredAmountCatalogue]}
                                onChange = {(e) => this.updateAmountCatalogue(e, this.props)}
                            />

                             <Field
                            type="text"
                            name="ma_auction_amount" 
                            id='ma_auction_amount'
                            label="Auction Amount"  
                            component={inputField}
                            readOnly =  {true}
                            containerclass='col-md-4'
                            validate={[requiredAuctionAmount]}
                        /> 
                    </div>
                    <div className="form-row">
                        <Field
                            type="number"
                            name="ma_auction_installments" 
                            id='ma_auction_installments'
                            label="Auction Installments"
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallments]}
                            onChange = {(e) => this.handleInstallmentsChange(e, this.props)}
                        />
                        <Field
                            type="number"
                            name="ma_defined_installments" 
                            id='ma_defined_installments'
                            label="Define Installments"
                            component={inputField}
                            containerclass='col-md-4'
                            validate={[requiredInstallments]}
                            //onChange = {this.handleInstallmentsChange}
                        />
                        
                        <Field
                            type="text"
                            name="ma_interval_period" 
                            id='ma_interval_period'
                            label="Interval"  
                            component={selectField}
                            defaultValue={JSON.stringify(this.state.sel_interval_period)}
                            data={JSON.stringify(this.state.interval_period)}
                            containerclass='col-md-4'
                            validate={[requiredInterval]}
                        />
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
                            name="ma_status" 
                            id='ma_status'
                            label="Status"
                            component={selectField} 
                            containerclass='col-md-4'
                            defaultValue={JSON.stringify(this.state.sel_status_dropdown)} 
                            data={JSON.stringify(this.state.record_status)}
                            validate={[requiredStatus]}
                            />
                    </div>
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
                            {   this.props.trans_arr ? (   
                                    this.props.trans_arr.map((val,index) => (
                                        <TrComponent  rowId={index} index={index} key={index}  />
                                    ))
                                 ): (
                                    <tr>
                                        <td colSpan='100'> No data available ..!</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <FormButtons listUrl={routes.CHIT_MASTER_LIST}/>
                </form>
            </div>
        );
    }
};


AuctionForm = reduxForm({
    form: 'auction_form',
    enableReinitialize: true
})(AuctionForm);

const mapStateToProps = state => {
    
    return {
        status_dropdown : state.customdropdown.recordStatus,
        auction_type : state.customdropdown.auctionType,
        amt_catalog_dropdown : state.amtcatalogue.dropdown_data,
        trans_arr : state.auction.trans_data,
        sel_amt_catalog_dropdown : state.auction.sel_amt_catalog_dropdown,
        sel_interval_period  : state.auction.sel_interval_period, 
        interval_period : state.customdropdown.intervalPeriod,
        shortCode : state.recordtrasnaction.rec_trans.short_code,
        sel_status_dropdown : state.auction.sel_status_dropdown
    };
};
  
export default connect(mapStateToProps)(AuctionForm);

