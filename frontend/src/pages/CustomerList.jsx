import React, { Component } from 'react';
import apis from '../api';
class CustomerList extends Component {

    constructor(props){
        super(props);
        this.state = {
            customer_data: []
        }
    }

    componentDidMount = async () => {

        await apis.getAllCustomers().then(customer => {
             this.setState({
                customer_data : customer.data.data,
            })
        })
    }

    render() {
        let showTable = true;
        const { customer_data } = this.state;
        if (typeof customer_data != 'undefined' && !customer_data.length) {
            showTable = false
        }
        return (
            <div className='container-fluid'>
                
            {showTable && (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customer_data.map((cus, index) => (
                            <tr key={index}>
                                <td>{cus.contactname}</td>
                                <td>{cus.contactemail}</td>
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

export default CustomerList

