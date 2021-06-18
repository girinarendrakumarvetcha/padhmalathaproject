
import React, { Component } from 'react';
import DrawBookListComponent from './DrawBookListComponent';

class TrComponent extends Component {
    render() {
        const { rowId, columnData, index, onClickFun } = this.props;
        return (
            <tr className={`drawlog-row-${rowId}`} key={index} onClick={onClickFun} >
                <td>{columnData.name}</td>
                <td>{columnData.shortCode}</td>
                <td>{columnData.drawDate}</td>
                <td>{columnData.definedInstallments}/{columnData.drawInstallments}</td>
                <td>{columnData.intervalData.label}</td>
                <td>{columnData.commissionAmt}</td>
                <td>{columnData.installmentAmt}</td>
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
                    <DrawBookListComponent rowData={rowData} />
                </td>
            </tr>
        );
    }
}


class DrawListComponent extends Component {

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
                        <th>Draw Name</th>
                        <th>Short Code</th>
                        <th>Draw Date</th>
                        <th>Defined/Actual Installments</th>
                        <th>Interval</th>
                        <th>Commission per Installment</th>
                        <th>Installment Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((value, index) => (
                        <React.Fragment key={`drawlist-row-${index}`}>
                            <TrComponent columnData={value} rowId={index} index={index} key={index} onClickFun={this.toggleExpander} />
                            {this.state.expanded &&
                                <TrChildComponent rowData={value.draw_book} />
                            }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default DrawListComponent;
