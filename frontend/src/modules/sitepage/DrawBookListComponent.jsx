
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routes } from "../../config/routes";
import DrawInvoiceComponent from './DrawInvoiceComponent';

class TrComponent extends Component {
    render() {
        const { rowId, columnData, index, onClickFun } = this.props;
        return (
            <tr className={`drawbook-row-${index}`} key={index} onClick={onClickFun} >
            <td>{columnData.customer_details['name']}</td>
            <td>{columnData.drawBookCode}</td>
            <td>{columnData.withdrawDate}/{columnData.actualWithdrawDate}</td>
            <td>{columnData.installmentStepNo}</td>
            <td>{columnData.isWithdrawed}</td>
            <td>{columnData.receivableAmount}</td>
            <td>{columnData.payableAmount}</td>
            <td><NavLink to={`${routes.DRAW_MASTER_TRANS_EDIT}/${columnData._id}/${columnData.drawMasterId}`}>Edit</NavLink></td>
        </tr>            
        );
    }
}

class TrChildComponent extends Component {
    render() {
        const { rowId, rowData, index } = this.props;
        return (
            <tr >
                <td colSpan={10}>
                    <DrawInvoiceComponent rowData={rowData}  />
                </td>
            </tr>
        );
    }
}

class DrawBookComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    toggleExpander = (e) => {
        if (!this.state.expanded) {
            this.setState({ expanded: true });
        } else {
            this.setState({ expanded: false });
        }
    }
    render() {
        const { rowData } = this.props;
        return (

            <table className='table table-bordered'>
                <thead>
                <tr>
                        <th>Customer</th>
                        <th>Book Code</th>
                        <th>Withdraw Date / Actual Widrw Date</th>
                        <th>Installment No.</th>
                        <th>Withdraw Status</th>
                        <th>Amount receivable</th>
                        <th>Amount payable</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((value, index) => (
                         <React.Fragment key={`drawbooklist-row-${index}`}>
                            <TrComponent columnData={value} rowId={index} index={index} key={index} onClickFun={this.toggleExpander} />  
                            {this.state.expanded &&
                                <TrChildComponent rowData={value.draw_invoice} />  
                            }   
                        </React.Fragment>
                        
                    ))}
                    
                </tbody>
            </table>
        );
    }
}

export default DrawBookComponent;
