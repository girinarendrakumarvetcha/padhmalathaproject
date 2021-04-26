import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import AmountCatalogForm from './Form';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
//import AppFormContainer from '../../Layout/AppFormContainer';

class AmountCatalogInsert extends Component {

    handleIncludeAmountCatalog = data => {
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.updateAmtCatalogueById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.AMOUNT_CATALOG_LIST}`);
            });
        }else{
            apis.insertAmtCatalog(data).then(res => {
                this.props.history.push(`${routes.AMOUNT_CATALOG_LIST}`);
            });
        }
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

export default withRouter(AmountCatalogInsert);
