import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import AuctionForm from './Form';
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import { saveAuctionDetailsRequest, getAuctionDetailsRequest, resetAuctionDetails } from '../../actions/auction';
import { getAmtCatalogueDropdownRequest} from '../../actions/amtcatalogue';
import { getRecordTransactionCodeRequest} from '../../actions/recordtransaction';
import history from '../../config/history';
import { initialize } from "redux-form";

class AuctionInsert extends Component {

    handleAuctionInsert = (data) => {
        console.log(data);
        // const url_params = this.props.match.params;
        // if(url_params.id !== undefined ){
        //     apis.updateAuctionMasterById(url_params.id,data).then(res => {
        //         this.props.history.push(`${routes.CHIT_MASTER_LIST}`);
        //     });
        // }else{
        //     apis.insertAuction(data).then(res => {
        //         this.props.history.push(`${routes.CHIT_MASTER_LIST}`);
        //     });
        // }
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {
            dispatch(saveAuctionDetailsRequest({data,id,history}));
            
        } else {
            dispatch(saveAuctionDetailsRequest({data,history}));
        }

    }
     componentDidMount = () => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props;

        dispatch(resetAuctionDetails());
        if (id) {
            dispatch(getAuctionDetailsRequest(id));
        }else{
            //dispatch(getRecordTransactionCodeRequest('auction'));
        }
        dispatch(getAmtCatalogueDropdownRequest());
        dispatch(initialize('auction_form', this.props.form_data));
     }  
    render(){
        return (
            <div>
                <PageTitle heading='Auction Form' />
                <AuctionForm  onSubmit={this.handleAuctionInsert} {...this.props} />
            </div>
        );
    }
};
//export default withRouter(AuctionInsert);

const mapStateToProps = state => {
    return {
        initialValues: state.auction.form_data,
    };
};

export default connect(mapStateToProps)(AuctionInsert);
