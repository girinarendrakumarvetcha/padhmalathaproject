import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawInvoiceForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { saveInvoiceDetailsRequest, getInvoiceDetailsRequest, resetInvoiceDetails } from '../../actions/invoice';
import history from '../../config/history';
import { initialize } from "redux-form";

class DrawInvoiceInsert extends Component {
    handleDrawInvoiceInsert = (data) => {
        // const url_params = this.props.match.params;
        // if(url_params.id !== undefined ){
        //     apis.updateDrawInvoiceById(url_params.id,data).then(res => {
        //         this.props.history.push(`${routes.DRAW_INVOICE_LIST}`);
        //     });
        // }else{
        //     apis.insertAuction(data).then(res => {
        //         this.props.history.push(`${routes.DRAW_INVOICE_LIST}`);
        //     });
        // }

        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {

            dispatch(saveInvoiceDetailsRequest({data,id,history}));
            // apis.updateInvoiceById(url_params.id, data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        } else {
            dispatch(saveInvoiceDetailsRequest({data,history}));

            // apis.insertInvoice(data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        }
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetInvoiceDetails());
        if (id) {
            dispatch(getInvoiceDetailsRequest(id));
        }
        this.setState({ ...this.props.form_data });
        dispatch(initialize('customer_form', this.props.form_data));

        // if(url_params.id !== undefined){
        //     dispatch(getInvoiceDetailsRequest(url_params.id));
        //     // apis.customerRecordFetch(url_params.id).then(res => {
        //     //     this.props.initialize( res.data.data);   
        //     // });
        // }
    }
    render(){
        return (
            <React.Fragment>
                <PageTitle heading='Draw Invoice' />
               <DrawInvoiceForm  onSubmit={this.handleDrawInvoiceInsert} {...this.props} />
            </React.Fragment>
        );
    }
};
//export default withRouter(DrawInvoiceInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.invoice.form_data,
    };
};

export default connect(mapStateToProps)(DrawInvoiceInsert);
  