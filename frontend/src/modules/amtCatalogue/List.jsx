import React, { Component , Fragment } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";

const formColumnsName = formColumns(
    {
      name: "ac_name",
      label: "Name"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsAmount = formColumns(
    {
      name: "ac_amount",
      label: "Amount"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsShortCode = formColumns(
    {
      name: "ac_short_code",
      label: "Short Code"
    },
    {
      sort: true,
      filter: true
    }
  );


class AmountCatalogList extends Component {
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
                    formColumnsAmount,
                    formColumnsShortCode ,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.AMOUNT_CATALOG_EDIT}/${
                                  this.state.amt_catalog[index.rowIndex].ac_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.amt_catalog[index.rowIndex].ac_id
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
                            <CusLisToolBarBtns addLink={`${routes.AMOUNT_CATALOG_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
     
      await apis.getAmtCatalogList().then(amt_catalog => {
        this.setState({
           amt_catalog : amt_catalog.data.data,
       })
   })
    }

    render() {

        return (
            <div className='container-fluid'>
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Amount Catalogue List</h2>
                        }
                        data={this.state.amt_catalog}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default AmountCatalogList

