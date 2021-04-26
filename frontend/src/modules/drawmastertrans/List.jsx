import React, { Component } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";

const formColumnsDrawBookCode = formColumns(
  {
    name: "dwt_draw_book_code",
    label: "Draw Book Code"
  },
  {
    sort: true,
    filter: true
  }
);
const formColumnsCustomerName = formColumns(
  {
    name: "dwt_customer_name",
    label: "Customer"
  },
  {
    sort: true,
    filter: true
  }
);
const formColumnsIsWithdrawed = formColumns(
  {
    name: "dwt_is_withdrawed",
    label: "Is Withdrawed"
  },
  {
    sort: true,
    filter: true
  }
);
const formColumnsReceivableAmount = formColumns(
  {
    name: "dwt_receivable_amount",
    label: "Receivable Amount"
  },
  {
    sort: true,
    filter: true
  }
);

const formColumnsPayableAmount = formColumns(
  {
    name: "dwt_payable_amount",
    label: "Payable Amount"
  },
  {
    sort: true,
    filter: true
  }
);

class DrawInvoicePaymentList extends Component {
    constructor(props){
        super(props);
        this.state = {
                deleteAlert: false,
                selectedId: [],
                name: "created",
                limit: 10,
                page: 0,
                total: 0,
                order: "asc",
                keyword: "",
                nameOfsortedText: "",
                selectedRows: [],
                list: [],
                columns: [
                  formColumnsCustomerName,
                  formColumnsDrawBookCode,
                  formColumnsIsWithdrawed,
                  formColumnsReceivableAmount ,
                  formColumnsPayableAmount,
                  {
                    name: "Actions",
                    label: "Actions",
                    options: {
                      customBodyRender: (value, index, id) => {
                        return (
                          
                          <ListingActionBtns 
                            link={`${routes.DRAW_MASTER_TRANS_EDIT}/${
                                this.state.dwt_data[index.rowIndex].dwt_id
                            }`}
                            label='Edit'
                            iconlabel='fa fa-pencil'
                            onClick={() =>
                              this.handleShowDeleteAlert([
                                this.state.dwt_data[index.rowIndex].dwt_id
                              ])
                            }
                          />
                          );
                      },
                      filter: false,
                      sort: false
                    }
                  }  
                ],
                options: {
                        filterType: "textField",
                        responsive: "scroll",
                        rowsPerPageOptions: [10, 20, 30],
                        count: 0,
                        rowsPerPage: 10,
                        print: false,
                        download: false,
                        serverSide: true,
                        filter: false,
                        customToolbar: () => {
                          return (
                            <div></div>
                            
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      
      const url_params = this.props.match.params;
        await apis.getDrawMasterTransList(url_params.id).then(dwt_data => {
            this.setState({
              dwt_data : dwt_data.data.data,
          })
        });
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Draw Master Trans List</h2>
                        }
                        data={this.state.dwt_data}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default DrawInvoicePaymentList;

