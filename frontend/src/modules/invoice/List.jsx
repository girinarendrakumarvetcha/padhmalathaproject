import React, { Component  } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import MUIDataTable from "mui-datatables";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";

const formColumnsCustomerName = formColumns(
    {
      name: "di_customer",
      label: "Customer"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsInstallmentStep = formColumns(
    {
      name: "di_installment_step",
      label: "Installment Step"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsPayableAmount = formColumns(
    {
      name: "di_payable_amount",
      label: "Payable Amount"
    },
    {
      sort: true,
      filter: true
    }
  );

const formColumnsPayableDate = formColumns(
    {
      name: "di_payment_date",
      label: "Payment Date"
    },
    {
      sort: true,
      filter: true
    }
  );
  const formColumnsPayableStatus= formColumns(
    {
      name: "di_payment_status",
      label: "Status"
    },
    {
      sort: true,
      filter: true
    }
  );


class DrawInvoiceList extends Component {
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
                    formColumnsInstallmentStep,
                    formColumnsPayableAmount   ,
                    formColumnsPayableDate,
                    formColumnsPayableStatus,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.DRAW_INVOICE_EDIT}/${
                                  this.state.draw_invoice[index.rowIndex].di_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.draw_invoice[index.rowIndex].di_id
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
        await apis.getDrawInvoiceList(url_params.id).then(draw_invoice => {
          console.log(draw_invoice.data.data);  
          this.setState({
              draw_invoice : draw_invoice.data.data
            })
        })
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Draw Invoice List</h2>
                        }
                        data={this.state.draw_invoice}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default DrawInvoiceList;

