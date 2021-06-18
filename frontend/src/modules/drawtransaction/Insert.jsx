import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter , Redirect  } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawTransactionForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { resetDrawTransactionDetails , getDrawTransactionDetailsRequest ,saveDrawTransactionDetailsRequest } from '../../actions/drawtransaction';
import history from '../../config/history';
import { initialize } from "redux-form";

class DrawTransactionInsert extends Component {

    handleIncludeDrawTransaction = (data) => {
        const url_params = this.props.match.params;
        
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {

            dispatch(saveDrawTransactionDetailsRequest({data,id,history}));
            // apis.updateInvoiceById(url_params.id, data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        } else {
            dispatch(saveDrawTransactionDetailsRequest({data,history}));

            // apis.insertInvoice(data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        }

        // if(url_params.id !== undefined){
        //     apis.updateDrawInvoicePaymentById(url_params.id,data).then(res => {
        //         this.props.history.push(`${routes.DRAW_INVOICE_PAYMENT_LIST}`);
        //     });
        // }
    }
     componentDidMount() {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetDrawTransactionDetails());
        if (id) {
            dispatch(getDrawTransactionDetailsRequest(id));
        }

        dispatch(initialize('draw_invoice_payment_form', this.props.form_data));

    }  
    render(){
        
        return (
            <div>
                <PageTitle heading='Draw Master Trans Form' />
                <DrawTransactionForm  onSubmit={this.handleIncludeDrawTransaction}   {...this.props}/>
            </div>
        );
    }
};
//export default withRouter(DrawTransactionInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.drawtransaction.form_data,
    };
};

export default connect(mapStateToProps)(DrawTransactionInsert);
  
