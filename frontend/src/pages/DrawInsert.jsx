import React, { Component } from 'react';
import apis from '../api';


class DrawInsert extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            ma_name  : '2L Auction',
            ma_print_name  : '2L Auction print name',
            ma_short_code  : '2LAUC',
            ma_status  : 'Active',
            ma_amt_catalog : 0,
            ma_installments : 25,
            ma_interval_period : 30,
            ma_commision_per_auction:10000,
            ma_installment_amount : 10000,
            ma_bonus_amount : 2000,
            ma_before_withdraw_amount : 8000,
            ma_after_withdraw_amount : 8000,
            ma_total_amount : 100000,
            //ma_unique_code  : '',
            //ma_added_by  : '',
            //ma_added_date  : '',
            //ma_updated_by  : '',
            //ma_updated_date  : '',
            trans_data : []
        }
    }
    _handleOnChange = async (event,type) => {
        const value = event.target.value;
        this.setState({ [type]  : value });
    }

    _handleIncludeAuction = async (event) => {
        const payload = this.state;
        //console.log(JSON.stringify(payload));
        await apis.insertAuction(payload).then(res => {
            window.alert(`Inserted successfully`)
        });
    }
    _handleInstallmentOnChange = async (event,type) => {
        const value = event.target.value;
        this.setState({ [type]  : value });
        const row_data = [];
        for(var i=0; i<value;i++){
            //const row_keys = {'id':'1','title':'test','price':123}
            row_data.push();
        }
        this.setState({'trans_data':row_data});
        //this.state.trans_data.push({'id':'1','title':'test','price':123});
    }
    render() {
        const draw_data = this.state;
        return (
            <div className='form-container'>
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="ma_name">Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_name" 
                                   name="ma_name" 
                                   placeholder="Name"
                                   value={draw_data.ma_name} 
                                   onChange={(e) => this._handleOnChange(e,'ma_name')} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="ma_print_name">Print Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_print_name" 
                                   name="ma_print_name" 
                                   placeholder="Name"
                                   value={draw_data.ma_print_name} 
                                   onChange={(e) => this._handleOnChange(e,'ma_print_name')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_auction_master">Auction Master</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_auction_master" 
                                   name="ma_auction_master" 
                                   placeholder="Name"
                                   value={draw_data.ma_auction_master} 
                                   onChange={(e) => this._handleOnChange(e,'ma_auction_master')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_amt_catalog">AmountCatlog</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_amt_catalog" 
                                   name="ma_amt_catalog" 
                                   placeholder="Amount"
                                   value={draw_data.ma_amt_catalog} 
                                   onChange={(e) => this._handleOnChange(e,'ma_amt_catalog')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_total_amount">Total Amount</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_total_amount" 
                                   name="ma_total_amount" 
                                   placeholder="Name"
                                   value={draw_data.ma_total_amount} 
                                   onChange={(e) => this._handleOnChange(e,'ma_total_amount')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_draw_date">Draw Date</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_draw_date" 
                                   name="ma_draw_date" 
                                   placeholder="Amount"
                                   value={draw_data.ma_draw_date} 
                                   onChange={(e) => this._handleOnChange(e,'ma_draw_date')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_draw_group">Draw Group</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_draw_group" 
                                   name="ma_draw_group" 
                                   placeholder="Name"
                                   value={draw_data.ma_draw_group} 
                                   onChange={(e) => this._handleOnChange(e,'ma_draw_group')} />
                        </div>
                    </div>                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_is_variable_bonus">Is Variable Bonus</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_is_variable_bonus" 
                                   name="ma_is_variable_bonus" 
                                   placeholder="Amount"
                                   value={draw_data.ma_is_variable_bonus} 
                                   onChange={(e) => this._handleOnChange(e,'ma_is_variable_bonus')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_draw_group">Draw Group</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_draw_group" 
                                   name="ma_draw_group" 
                                   placeholder="Name"
                                   value={draw_data.ma_draw_group} 
                                   onChange={(e) => this._handleOnChange(e,'ma_draw_group')} />
                        </div>
                    </div>                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_installments">Installments</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_installments" 
                                   name="ma_installments" 
                                   placeholder="Amount"
                                   value={draw_data.ma_installments} 
                                   onChange={(e) => this._handleOnChange(e,'ma_installments')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_total_amount">Total Amount</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_total_amount" 
                                   name="ma_total_amount" 
                                   placeholder="Name"
                                   value={draw_data.ma_total_amount} 
                                   onChange={(e) => this._handleOnChange(e,'ma_total_amount')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_interval_period">Interval Period</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_interval_period" 
                                   name="ma_interval_period" 
                                   placeholder="Amount"
                                   value={draw_data.ma_interval_period} 
                                   onChange={(e) => this._handleOnChange(e,'ma_interval_period')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_bonus_amount">Bonus Ammount</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_bonus_amount" 
                                   name="ma_bonus_amount" 
                                   placeholder="Bonus Amount"
                                   value={draw_data.ma_bonus_amount} 
                                   onChange={(e) => this._handleInstallmentOnChange(e,'ma_bonus_amount')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_before_withdraw_amount">Before Withdraw</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_before_withdraw_amount" 
                                   name="ma_before_withdraw_amount" 
                                   placeholder="amount"
                                   value={draw_data.ma_before_withdraw_amount} 
                                   onChange={(e) => this._handleInstallmentOnChange(e,'ma_before_withdraw_amount')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_after_withdraw_amount">After Withdraw</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_after_withdraw_amount" 
                                   name="ma_after_withdraw_amount" 
                                   placeholder="amount"
                                   value={draw_data.ma_after_withdraw_amount} 
                                   onChange={(e) => this._handleInstallmentOnChange(e,'ma_after_withdraw_amount')} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_commision_per_auction">Commision Per Auctuion</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_commision_per_auction" 
                                   name="ma_commision_per_auction" 
                                   placeholder="amount"
                                   value={draw_data.ma_commision_per_auction} 
                                   onChange={(e) => this._handleInstallmentOnChange(e,'ma_commision_per_auction')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_installment_amount">Installment Amount</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_installment_amount" 
                                   name="ma_installment_amount" 
                                   placeholder="Amount"
                                   value={draw_data.ma_installment_amount} 
                                   onChange={(e) => this._handleOnChange(e,'ma_installment_amount')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_short_code">Short code</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_short_code" 
                                   name="ma_short_code" 
                                   placeholder="Short Code"
                                   value={draw_data.ma_short_code} 
                                   onChange={(e) => this._handleOnChange(e,'ma_short_code')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ma_status">Status</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="ma_status" 
                                   name="ma_status" 
                                   placeholder="Status"
                                   value={draw_data.ma_status} 
                                   onChange={(e) => this._handleOnChange(e,'ma_status')} />
                        </div>
                    </div>
                    <div className='container-fluid' style={{display:'none'}}>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Step</th>
                                    <th>before</th>
                                    <th>After</th>
                                    <th>Bonus</th>
                                    <th>Actual Amt</th>
                                    <th>Comm. Amt</th>
                                    <th>Final Amt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trans_data.map(( data, index ) => {
                                    return (
                                        <tr key={index}>
                                        <td>{index+1}</td>    
                                        <td><input name='column1[]' ></input></td>
                                        <td><input name='column2[]' ></input></td>
                                        <td><input name='column3[]' ></input></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this._handleIncludeAuction} >Submit</button>
                </form>
            </div>
        )
    }
}

export default DrawInsert