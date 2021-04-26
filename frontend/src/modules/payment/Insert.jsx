import React, { Component } from 'react';
import { withRouter , Redirect  } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawInvoicePaymentForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';

class DrawInvoicePaymentInsert extends Component {

    handleIncludeDrawInvoicePayment = (data) => {
        const url_params = this.props.match.params;
        console.log(data);
        apis.insertDrawInvoicePayment(data).then(res => {            
            this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        });
        // if(url_params.id !== undefined){
        //     apis.updateDrawInvoicePaymentById(url_params.id,data).then(res => {
        //         this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        //     });
        // }else{
        //     apis.insertDrawInvoicePayment(data).then(res => {            
        //         this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        //     });
        // }
    }
       
    render(){
        
        return (
            <div>
                <PageTitle heading='Draw Invoice Payment Form' />
                <DrawInvoicePaymentForm  onSubmit={this.handleIncludeDrawInvoicePayment}   {...this.props}/>
            </div>
        );
    }
};
export default withRouter(DrawInvoicePaymentInsert);
