import React, { Component  } from 'react';
import { connect } from "react-redux";
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";
import { getCustomerGroupListRequest, resetCustomerGroupDetails } from '../../actions/customergroup';
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


class CustomerGroupList extends Component {
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
                              link={`${routes.CUSTOMER_GROUP_EDIT}/${
                                  this.state.list_data[index.rowIndex].dg_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.list_data[index.rowIndex].dg_id
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
                        responsive: "standard",
                        rowsPerPageOptions: [10, 20, 30],
                        count: 0,
                        rowsPerPage: 10,
                        print: false,
                        download: false,
                        serverSide: true,
                        filter: false,
                        customToolbar: () => {
                          return (
                            <CusLisToolBarBtns addLink={`${routes.CUSTOMER_GROUP_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      const {
        dispatch
      } = this.props;
        dispatch(resetCustomerGroupDetails());
        dispatch(getCustomerGroupListRequest());
        
    }
    componentWillReceiveProps(props){
      this.setState({'list_data' : props.list_data});
    }
    render() {

        return (
            <div className='container-fluid'>
                
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Customer Group List</h2>
                        }
                        data={this.state.list_data}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

//export default CustomerGroupList;

const mapStateToProps = state => {
  return {
      list_data: state.customergroup.list_data,
  };
};

export default connect(mapStateToProps)(CustomerGroupList);