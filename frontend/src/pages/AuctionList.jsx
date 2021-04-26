import React, { Component } from 'react';
import apis from '../api';
class AuctionList extends Component {

    constructor(props){
        super(props);
        this.state = {
            ma_data: []
        }
    }

    componentDidMount = async () => {
        await apis.getAuctionList().then(auction => {
            console.log(auction.data.data); 
            this.setState({
                ma_data : auction.data.data,
            })
        })
    }

    render() {
        let showTable = true;
        const { ma_data } = this.state;
        if (typeof ma_data != 'undefined' && !ma_data.length) {
            showTable = false
        }
        return (
            <div className='container-fluid'>
             {!showTable && (<p>No data..!</p>)}   
            {showTable && (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Installments</th>
                            <th>Short Code</th>
                            <th>Amount</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ma_data.map((auc, index) => (
                            <tr key={index}>
                                <td>{auc.ma_name}</td>
                                <td>{auc.ma_installments}</td>
                                <td>{auc.ma_shortCode}</td>
                                <td>{auc.ma_amount}</td>
                                <td><a href='auction'>eidt</a></td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        )
    }
}

export default AuctionList

