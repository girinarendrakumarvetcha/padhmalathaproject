import React, { Component } from 'react';
import { connect } from "react-redux";
import apis from '../../api';
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import MUIDataTable from "mui-datatables";
import { getCustomerListRequest, resetCustomerDetails } from '../../actions/customer';

const formColumnsCustomerName = formColumns(
    {
      name: "cus_name",
      label: "Customer Name"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsCustomerEmail = formColumns(
    {
      name: "cus_email",
      label: "Email"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsPhone = formColumns(
    {
      name: "cus_phone",
      label: "Phone Number"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsWhatsapp = formColumns(
    {
      name: "cus_whatsapp",
      label: "Whatsapp Number"
    },
    {
      sort: true,
      filter: true
    }
  );


class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = {
                deleteAlert: false,
                selectedId: [],
                list_data : [], 
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
                  formColumnsCustomerEmail,
                  formColumnsPhone,
                  //formColumnsWhatsapp,
                  {
                    name: "Actions",
                    label: "Actions",
                    options: {
                      customBodyRender: (value, index, id) => {
                        return (
                          
                          <ListingActionBtns 
                            link={`${routes.CUSTOMER_EDIT}/${
                                this.state.list_data[index.rowIndex].cus_id
                            }`}
                            label='Edit'
                            iconlabel='fa fa-pencil'
                            onClick={() =>
                              this.handleShowDeleteAlert([
                                this.state.list_data[index.rowIndex].cus_id
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
                            <CusLisToolBarBtns addLink={`${routes.CUSTOMER_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
      const {
        dispatch
    } = this.props;
        // await apis.getAllCustomers().then(customer => {
        //     this.setState({
        //       customer_data : customer.data.data,
        //   })
        // });

        dispatch(resetCustomerDetails());
        dispatch(getCustomerListRequest());
        
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
                          <h2>Customers List</h2>
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

// export default InstallmentIntervalList;

const mapStateToProps = state => {
  //console.log(state.customer);
  return {
      list_data: state.customer.list_data,
  };
};

export default connect(mapStateToProps)(CustomerList);

