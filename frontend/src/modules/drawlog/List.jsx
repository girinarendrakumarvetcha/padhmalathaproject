import React, { Component , Fragment } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";

const formColumnsName = formColumns(
    {
      name: "dl_name",
      label: "Draw Name"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsInstallments = formColumns(
    {
      name: "dl_installments",
      label: "Installments"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsShortCode = formColumns(
    {
      name: "dl_short_code",
      label: "Short Code"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsAmount = formColumns(
    {
      name: "dl_amount",
      label: "Amount"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsDate = formColumns(
    {
      name: "dl_date",
      label: "Amount"
    },
    {
      sort: true,
      filter: true
    }
  );  

class DrawLogList extends Component {
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
                    formColumnsName,
                    formColumnsDate,
                    formColumnsInstallments,
                    formColumnsShortCode,
                    formColumnsAmount ,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.DRAW_MASTER_EDIT}/${
                                  this.state.dl_data[index.rowIndex].dl_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.dl_data[index.rowIndex].dl_id
                                ])
                              }
                            />
                            );
                        },
                        filter: false,
                        sort: false
                      }
                    },
                    {
                      name: "Invoice",
                      label: "Invoices",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            <NavLink to={`${routes.DRAW_INVOICE_LIST_URL}/${
                              this.state.dl_data[index.rowIndex].dl_id
                          }`}>
                              Invoices
                              </NavLink>
                           
                            );
                        },
                        filter: false,
                        sort: false
                      }
                    },
                    {
                      name: "Trans Data",
                      label: "Trans Data",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            <NavLink to={`${routes.DRAW_MASTER_TRANS_LIST_URL}/${
                              this.state.dl_data[index.rowIndex].dl_id
                          }`}>
                              Trans
                              </NavLink>
                           
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
                            <CusLisToolBarBtns addLink={`${routes.DRAW_MASTER_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      await apis.getDrawList().then(draw => {
          console.log(draw.data.data); 
          this.setState({
              dl_data : draw.data.data,
          })
      })
    }

    render() {

        return (
            <div className='container-fluid'>
                
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Drawlog List</h2>
                        }
                        data={this.state.dl_data}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default DrawLogList;

