import React, { Component  } from 'react';
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";

const formColumnsName = formColumns(
    {
      name: "dg_name",
      label: "Gropup Name"
    },
    {
      sort: true,
      filter: true
    }
  );

const formColumnsShortCode = formColumns(
    {
      name: "dg_short_code",
      label: "Short Code"
    },
    {
      sort: true,
      filter: true
    }
  );


class DrawGroupList extends Component {
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
                    formColumnsShortCode ,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.DRAW_GROUP_EDIT}/${
                                  this.state.draw_group[index.rowIndex].dg_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.draw_group[index.rowIndex].dg_id
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
                            <CusLisToolBarBtns addLink={`${routes.DRAW_GROUP_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
        await apis.getGroupList().then(draw_group => {
            this.setState({
                draw_group : draw_group.data.data,
            })
        })
    }

    render() {

        return (
            <div className='container-fluid'>
                
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Draw Group List</h2>
                        }
                        data={this.state.draw_group}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

export default DrawGroupList;

