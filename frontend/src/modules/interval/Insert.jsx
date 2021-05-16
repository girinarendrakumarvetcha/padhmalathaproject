import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import IntervalForm from './Form';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import AppFormContainer from '../../Layout/AppFormContainer';
import { saveIntervalDetailsRequest, getIntervalDetailsRequest, resetIntervalDetails } from '../../actions/interval';
import history from '../../config/history';
import { initialize } from "redux-form";


class IntervalInsert extends Component {

    handleintervalInsert = (data) => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props
        if (id) {
            dispatch(saveIntervalDetailsRequest({data,id,history}));
        } else {
            dispatch(saveIntervalDetailsRequest({data,history}));
        }        
    }
    componentDidMount() {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetIntervalDetails());
        if (id) {
            dispatch(getIntervalDetailsRequest(id));
        }
        this.setState({ ...this.props.form_data });
        dispatch(initialize('interval_form', this.props.form_data));
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
//export default withRouter(IntervalInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.interval.form_data,
    };
};

export default connect(mapStateToProps)(IntervalInsert);
