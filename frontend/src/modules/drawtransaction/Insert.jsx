import React, { Component } from 'react';
import { withRouter , Redirect  } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawTransactionForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';

class DrawTransactionInsert extends Component {

    handleIncludeDrawInvoicePayment = (data) => {
        const url_params = this.props.match.params;
        
        if(url_params.id !== undefined){
            apis.updateDrawInvoicePaymentById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
            });
        }
    }
       
    render(){
        
        return (
            <div>
                <PageTitle heading='Draw Master Trans Form' />
                <DrawTransactionForm  onSubmit={this.handleIncludeDrawInvoicePayment}   {...this.props}/>
            </div>
        );
    }
};
export default withRouter(DrawTransactionInsert);
