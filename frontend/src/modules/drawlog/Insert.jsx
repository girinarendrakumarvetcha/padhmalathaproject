import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import DrawLogForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { saveDrawLogDetailsRequest, getDrawLogDetailsRequest, resetDrawLogDetails } from '../../actions/drawlog';
import { getAmtCatalogueDropdownRequest} from '../../actions/amtcatalogue';
import { getAuctionDropdownRequest} from '../../actions/auction';
import { getCustomerGroupDropdownRequest} from '../../actions/customergroup';
import history from '../../config/history';
import { initialize } from "redux-form";


class DrawLogInsert extends Component {

    handleDrawLogInsert = (data) => {
        console.log(data);  
        // apis.insertDraw(data).then(res => {
        //     //this.props.history.push(`${routes.DRAW_MASTER_LIST}`);
        // });

        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {
            dispatch(saveDrawLogDetailsRequest({data,id,history}));
            
        } else {
            dispatch(saveDrawLogDetailsRequest({data,history}));
        }
    }
    componentDidMount = () => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetDrawLogDetails());
        if (id) {
            dispatch(getDrawLogDetailsRequest(id));
        }
        dispatch(getAmtCatalogueDropdownRequest());
        dispatch(getAuctionDropdownRequest());
        dispatch(getCustomerGroupDropdownRequest());
        dispatch(initialize('draw_log_forms', this.props.form_data));
     }
       
    render(){
        return (
            <React.Fragment>
                <PageTitle heading='Draw Log' />
                <DrawLogForm  onSubmit={this.handleDrawLogInsert}  {...this.props} />
            </React.Fragment>
        );
    }
};
//export default withRouter(DrawLogInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.drawlog.form_data,
    };
};

export default connect(mapStateToProps)(DrawLogInsert);