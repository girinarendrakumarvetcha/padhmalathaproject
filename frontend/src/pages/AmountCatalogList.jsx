import React, { Component } from 'react';
import apis from '../api';
class AmountCatalogList extends Component {
    constructor(props){
        super(props);
        this.state = {
            amt_catalog_data: []
        }
    }

    componentDidMount = async () => {
        await apis.getAmtCatalogList().then(amt_catalog => {
             this.setState({
                amt_catalog : amt_catalog.data.data,
            })
        })
    }

    render() {
        let showTable = true;
        const { amt_catalog } = this.state;
        console.log(amt_catalog);
        if (typeof amt_catalog == 'undefined' || !amt_catalog.length) {
            showTable = false;
        }
        return (
            <div className='container-fluid'>
            {showTable && (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Short Code</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.amt_catalog.map((cus, index) => (
                            <tr key={index}>
                                <td>{cus.name}</td>
                                <td>{cus.amount}</td>
                                <td>{cus.shortcode}</td>
                                <td><a href='customer'>eidt</a></td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        )
    }
}

export default AmountCatalogList

