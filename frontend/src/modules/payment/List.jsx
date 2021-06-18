import React, { Component } from 'react';
import { connect } from "react-redux";
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";
import { getPaymentListRequest, resetPaymentDetails } from '../../actions/payment';

const formColumnsShortCode = formColumns(
  {
    name: "dip_short_code",
    label: "Short Code"
  },
  {
    sort: true,
    filter: true
  }
);
const formColumnsPaidAmount = formColumns(
  {
    name: "dip_paid_amount",
    label: "Paid Amount"
  },
  {
    sort: true,
    filter: true
  }
);
const formColumnsPaidDate = formColumns(
  {
    name: "dip_paid_date",
    label: "Paid Date"
  },
  {
    sort: true,
    filter: true
  }
);

class DrawInvoicePaymentList extends Component {
    constructor(props){
        super(props);
        //debugger;
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
                  formColumnsShortCode,
                  formColumnsPaidAmount,
                  formColumnsPaidDate,
                  {
                    name: "Actions",
                    label: "Actions",
                    options: {
                      customBodyRender: (value, index, id) => {
                        return (
                          
                          <ListingActionBtns 
                            link={`${routes.DRAW_INVOICE_PAYMENT_EDIT}/${
                                this.props.list_data[index.rowIndex].cus_id
                            }`}
                            label='Edit'
                            iconlabel='fa fa-pencil'
                            onClick={() =>
                              this.handleShowDeleteAlert([
                                this.props.list_data[index.rowIndex].cus_id
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
                            <CusLisToolBarBtns addLink={`${routes.DRAW_INVOICE_PAYMENT_ADD}/${this.props.match.params.id}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      // console.log(this.props.match);
      // const url_params = this.props.match.params;
      //   await apis.getDrawInvoicePaymentList(url_params.id).then(dip_data => {
      //       this.setState({
      //         dip_data : dip_data.data.data,
      //     })
      //   });

      const {
        match: {
            params: { id }
          },
          dispatch
      } = this.props;
        dispatch(resetPaymentDetails());
        dispatch(getPaymentListRequest({id:id}));
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className={"container-fluid"}>
                    <MUIDataTable
                        title={
                          <h2>Draw Invoice Payment List</h2>
                        }
                        data={this.props.list_data}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </div>
        )
    }
}

//export default DrawInvoicePaymentList;


const mapStateToProps = state => {
  return {
      list_data: state.payment.list_data,
  };
};

export default connect(mapStateToProps)(DrawInvoicePaymentList);