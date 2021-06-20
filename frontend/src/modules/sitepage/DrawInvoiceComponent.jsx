
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routes } from "../../config/routes";

class TrComponent extends Component {
    render() {
        const { rowId, columnData, index } = this.props;
        return (
            <tr className={`drawlog-row-${index}`} key={index} >
                <td>{columnData.afterPayableAmount}</td>
                <td>{columnData.bonusAmount}</td>
                <td>{columnData.payableAmount}</td>
                <td>{columnData.paidAmount}</td>
                <td>{columnData.paymentStatus}</td>
                <td><NavLink to={`${routes.DRAW_INVOICE_EDIT}/${columnData._id}/${columnData.drawMasterId}`}>Edit</NavLink></td>
            </tr>
        );
    }
}


class DrawInvoiceComponent extends Component {
    render() {
        const { rowData } = this.props;
        return (

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Installment Amount</th>
                        <th>Bonus Amount</th>
                        <th>Payable Amount</th>
                        <th>Paid Amount</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((value, index) => (
                        <TrComponent columnData={value} rowId={index} index={index} key={index}/>  
                    ))}
                    
                </tbody>
            </table>
        );
    }
}

export default DrawInvoiceComponent;
