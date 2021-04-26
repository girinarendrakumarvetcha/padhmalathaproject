import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawInvoiceForm from './Form';

class DrawInvoiceInsert extends Component {
    handleDrawInvoiceInsert = (data) => {
        const url_params = this.props.match.params;
        if(url_params.id !== undefined ){
            apis.updateDrawInvoiceById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.DRAW_INVOICE_LIST}`);
            });
        }else{
            apis.insertAuction(data).then(res => {
                this.props.history.push(`${routes.DRAW_INVOICE_LIST}`);
            });
        }
    }
    render(){
        return (
            <DrawInvoiceForm  onSubmit={this.handleDrawInvoiceInsert} {...this.props} />
        );
    }
};
export default withRouter(DrawInvoiceInsert);
