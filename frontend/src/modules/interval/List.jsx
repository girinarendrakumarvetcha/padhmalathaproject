import React, { Component } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";

const formColumnsName = formColumns(
    {
      name: "im_name",
      label: "Name"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsInterval = formColumns(
    {
      name: "im_interval",
      label: "Interval"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsShortCode = formColumns(
    {
      name: "im_short_code",
      label: "Short Code"
    },
    {
      sort: true,
      filter: true
    }
  );


class InstallmentIntervalList extends Component {
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
                    formColumnsInterval,
                    formColumnsShortCode ,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.INTERVAL_EDIT}/${
                                  this.state.interval_data[index.rowIndex].im_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.interval_data[index.rowIndex].im_id
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
                            <CusLisToolBarBtns addLink={`${routes.INTERVAL_ADD}`} />
                          );
                        }
                    }
                };
    }

    handleShowDeleteAlert = ()  => {
      alert('asdf');
    }

    componentDidMount = async () => {
      await apis.getIntervalList().then(installment_Interval => {
          this.setState({
                interval_data : installment_Interval.data.data,
            })
        })
    }

    render() {

        return (
            <div className='container-fluid'>
                
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Interval List</h2>
                        }
                        data={this.state.interval_data}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default InstallmentIntervalList

