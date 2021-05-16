import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import AmountCatalogForm from './Form';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
//import AppFormContainer from '../../Layout/AppFormContainer';
import { saveAmtCatalogueDetailsRequest, getAmtCatalogueDetailsRequest, resetAmtCatalogueDetails } from '../../actions/amtcatalogue';
import history from '../../config/history';
import { initialize } from "redux-form";

class AmountCatalogInsert extends Component {

    handleIncludeAmountCatalog = data => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props
        if (id) {
            dispatch(saveAmtCatalogueDetailsRequest({data,id,history}));
        } else {
            dispatch(saveAmtCatalogueDetailsRequest({data,history}));
        }
    } 
    componentDidMount() {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetAmtCatalogueDetails());
        if (id) {
            dispatch(getAmtCatalogueDetailsRequest(id));
        }

        dispatch(initialize('amount_catalogue_form', this.props.form_data));
    }  
    render(){
        return (    
            <div>
            <PageTitle heading='Amount Catalogue Form' />
            <AmountCatalogForm  onSubmit={this.handleIncludeAmountCatalog} {...this.props} />
            </div>
        );
    }
};

//export default withRouter(AmountCatalogInsert);
const mapStateToProps = state => {
    return {
        initialValues: state.amtcatalogue.form_data,
    };
};

export default connect(mapStateToProps)(AmountCatalogInsert);
