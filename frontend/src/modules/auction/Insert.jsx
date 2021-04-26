import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import AuctionForm from './Form';

class AuctionInsert extends Component {

    handleAuctionInsert = (data) => {
        
        const url_params = this.props.match.params;
        if(url_params.id !== undefined ){
            apis.updateAuctionMasterById(url_params.id,data).then(res => {
                this.props.history.push(`${routes.CHIT_MASTER_LIST}`);
            });
        }else{
            apis.insertAuction(data).then(res => {
                this.props.history.push(`${routes.CHIT_MASTER_LIST}`);
            });
        }
    }
     componentDidMount = () => {
        console.log('insert form');
     }  
    render(){
        return (
            <AuctionForm  onSubmit={this.handleAuctionInsert} {...this.props} />
        );
    }
};
export default withRouter(AuctionInsert);
