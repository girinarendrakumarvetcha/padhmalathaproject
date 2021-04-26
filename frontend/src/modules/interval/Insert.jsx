import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import IntervalForm from './Form';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import AppFormContainer from '../../Layout/AppFormContainer';
class IntervalInsert extends Component {

    handleintervalInsert = (data) => {
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.updateIntervalById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.INTERVAL_LIST}`);
            });
        }else{
            apis.insertInterval(data).then(res => {
                this.props.history.push(`${routes.INTERVAL_LIST}`);
            });
        }
        
    }
    
    
    render(){

        return (
            <div>
                <AppFormContainer />
                <PageTitle heading='Interval Form' />
                <IntervalForm  onSubmit={this.handleintervalInsert}  {...this.props} />
            </div>
        );
    }
};
export default withRouter(IntervalInsert);
