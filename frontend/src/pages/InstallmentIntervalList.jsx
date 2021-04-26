import React, { Component } from 'react';
import apis from '../api';
class InstallmentIntervalList extends Component {
    constructor(props){
        super(props);
        this.state = {
            installment_Interval_data: []
        }
    }

    componentDidMount = async () => {
        await apis.getIntervalList().then(installment_Interval => {
             this.setState({
                installment_Interval : installment_Interval.data.data,
            })
        })
    }

    render() {
        let showTable = true;
        const { installment_Interval } = this.state;
        console.log(installment_Interval);
        if (typeof installment_Interval == 'undefined' || !installment_Interval.length) {
            showTable = false;
        }
        return (
            <div className='container-fluid'>
            {showTable && (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Interval</th>
                            <th>Short Code</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.installment_Interval.map((cus, index) => (
                            <tr key={index}>
                                <td>{cus.name}</td>
                                <td>{cus.interval}</td>
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

export default InstallmentIntervalList

