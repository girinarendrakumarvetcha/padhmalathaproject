import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter , Redirect  } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawInvoicePaymentForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { savePaymentDetailsRequest, getPaymentDetailsRequest, resetPaymentDetails } from '../../actions/payment';
import history from '../../config/history';
import { initialize } from "redux-form";
class DrawInvoicePaymentInsert extends Component {

    handleIncludeDrawInvoicePayment = (data) => {
        const url_params = this.props.match.params;
        console.log(data);
        
        // apis.insertDrawInvoicePayment(data).then(res => {            
        //     this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        // });
        // if(url_params.id !== undefined){
        //     apis.updateDrawInvoicePaymentById(url_params.id,data).then(res => {
        //         this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        //     });
        // }else{
        //     apis.insertDrawInvoicePayment(data).then(res => {            
        //         this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        //     });
        // }

        const {
            match: {
                params: { id , id2 }
            },
            dispatch
        } = this.props;
        if(typeof data.dip_draw_invoice == 'undefined'){
            data['dip_draw_invoice'] = id;
        }      
        
        if (id2) {

            dispatch(savePaymentDetailsRequest({data,id,history}));
            // apis.updatePaymentById(url_params.id, data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        } else {
            dispatch(savePaymentDetailsRequest({data,history}));

            // apis.insertPayment(data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        }
    }
    
    componentDidMount() {
        const {
            match: {
                params: { id }
            },
            dispatch,
            change
        } = this.props;

        dispatch(resetPaymentDetails());
        if (id) {
            dispatch(getPaymentDetailsRequest(id));
        }
        this.setState({ ...this.props.form_data });
                
        dispatch(initialize('draw_invoice_payment_form', this.props.form_data));
        //this.props.change('dip_draw_invoice',id);

        // if(url_params.id !== undefined){
        //     dispatch(getPaymentDetailsRequest(url_params.id));
        //     // apis.customerRecordFetch(url_params.id).then(res => {
        //     //     this.props.initialize( res.data.data);   
        //     // });
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
//export default withRouter(DrawInvoicePaymentInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.payment.form_data,
    };
};

export default connect(mapStateToProps)(DrawInvoicePaymentInsert);
