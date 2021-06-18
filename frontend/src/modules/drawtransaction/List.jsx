import React, { Component } from 'react';
import { connect } from "react-redux";
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";
import { getDrawTransactionListRequest, resetDrawTransactionDetails } from '../../actions/drawtransaction';

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

class DrawTransactionList extends Component {
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
                                this.state.list_data[index.rowIndex].dwt_id
                            }/${
                              this.props.list_data[index.rowIndex].dwt_draw_master_id
                          }`}
                            label='Edit'
                            iconlabel='fa fa-pencil'
                            onClick={() =>
                              this.handleShowDeleteAlert([
                                this.state.list_data[index.rowIndex].dwt_id
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
                            <div></div>
                            
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      
      // const url_params = this.props.match.params;
      //   await apis.getDrawMasterTransList(url_params.id).then(list_data => {
      //       this.setState({
      //         list_data : list_data.data.data,
      //     })
      //   });
      const {
        match: {
            params: { id }
          },
          dispatch
      } = this.props;
        dispatch(resetDrawTransactionDetails());
        dispatch(getDrawTransactionListRequest({id:id}));
    }
    static getDerivedStateFromProps = (props, state) => { 
      
      return {
          ...state,
          list_data : props.list_data
      }
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Draw Master Trans List</h2>
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

const mapStateToProps = state => {
  return {
      list_data: state.drawtransaction.list_data,
  };
};

export default connect(mapStateToProps)(DrawTransactionList);

