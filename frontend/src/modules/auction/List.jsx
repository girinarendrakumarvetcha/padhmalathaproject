import React, { Component  } from 'react';
import { connect } from "react-redux";
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import CusLisToolBarBtns from "../../helpers/listingCustomToolbar";
import MUIDataTable from "mui-datatables";
import ListingActionBtns from "../../Layout/AppMain/ListingActionBtns";
import { getAuctionListRequest, resetAuctionDetails } from '../../actions/auction';
const formColumnsName = formColumns(
    {
      name: "ma_name",
      label: "Name"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsInstallments = formColumns(
    {
      name: "ma_installments",
      label: "Installments"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsShortCode = formColumns(
    {
      name: "ma_shortCode",
      label: "Short Code"
    },
    {
      sort: true,
      filter: true
    }
  );
const formColumnsAmount = formColumns(
    {
      name: "ma_amount",
      label: "Amount"
    },
    {
      sort: true,
      filter: true
    }
  );


class AuctionList extends Component {
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
                    formColumnsInstallments,
                    formColumnsShortCode   ,
                    formColumnsAmount,
                    {
                      name: "Actions",
                      label: "Actions",
                      options: {
                        customBodyRender: (value, index, id) => {
                          return (
                            
                            <ListingActionBtns 
                              link={`${routes.CHIT_MASTER_EDIT}/${
                                  this.state.list_data[index.rowIndex].ma_id
                              }`}
                              label='Edit'
                              iconlabel='fa fa-pencil'
                              onClick={() =>
                                this.handleShowDeleteAlert([
                                  this.state.list_data[index.rowIndex].ma_id
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
                            <CusLisToolBarBtns addLink={`${routes.CHIT_MASTER_ADD}`} />
                          );
                        }
                    }
                };
    }

    componentDidMount = async () => {
        // await apis.getAuctionList().then(auction => {
        //     this.setState({
        //         auction_data : auction.data.data
        //     })
        // })
        const {
          dispatch
        } = this.props;
        dispatch(resetAuctionDetails());
        dispatch(getAuctionListRequest()); 
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
                          <h2>Auction List</h2>
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

//export default AuctionList
const mapStateToProps = state => {
  return {
      list_data: state.auction.list_data,
  };
};

export default connect(mapStateToProps)(AuctionList);

