import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import CustomerForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { saveCustomerDetailsRequest, getCustomerDetailsRequest, resetCustomerDetails } from '../../actions/customer';
import history from '../../config/history';
import { initialize } from "redux-form";
class CustomerInsert extends Component {

    handleIncludeCustomer = (data) => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {

            dispatch(saveCustomerDetailsRequest({data,id,history}));
            // apis.updateCustomerById(url_params.id, data).then(res => {
            //     this.props.history.push(`${routes.CUSTOMER_LIST}`);
            // });
        } else {
            dispatch(saveCustomerDetailsRequest({data,history}));

            // apis.insertCustomer(data).then(res => {
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

        dispatch(resetCustomerDetails());
        if (id) {
            dispatch(getCustomerDetailsRequest(id));
        }
        this.setState({ ...this.props.form_data });
        dispatch(initialize('customer_form', this.props.form_data));

        // if(url_params.id !== undefined){
        //     dispatch(getCustomerDetailsRequest(url_params.id));
        //     // apis.customerRecordFetch(url_params.id).then(res => {
        //     //     this.props.initialize( res.data.data);   
        //     // });
        // }
    }


    render() {

        return (
            <div>
                <PageTitle heading='Customer Form' />
                <CustomerForm onSubmit={this.handleIncludeCustomer}   {...this.props} />
            </div>
        );
    }
};

//export default withRouter(CustomerInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.customer.form_data,
    };
};

export default connect(mapStateToProps)(CustomerInsert);
