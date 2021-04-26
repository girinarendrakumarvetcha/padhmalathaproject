import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { debounce } from "lodash";
import {
  adminGetCustomersRequest,
  adminGetCustomersSuccess,
  adminStatusUpdateCustomerRequest
} from "../../actions/customers";
import { routes } from "../../config/routes";
import { formColumns } from "../../config/listingColumns";
import asyncLoadable from "../../helpers/AsyncLoadable";
import MUIDataTable from "mui-datatables";
import CustomStatus from "../../helpers/custom-status";
import "../components.scss";
const Confirmation = asyncLoadable(() => import("../Confirmation"));

// Full Name column

const formColumnsName = formColumns(
  {
    name: "fullName",
    label: "Full Name"
  },
  {
    sort: true,
    filter: true
  }
);

// Email column

const formColumnsEmail = formColumns({
  name: "email",
  label: "Email"
});

// Main class

class Listing extends Component {
  constructor(props) {
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
        formColumnsEmail,
        {
          name: "active",
          label: "Status",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, index) => {
              return (
                <Fragment>
                  <CustomStatus
                    index={index["rowIndex"]}
                    value={value}
                    onChangeProperties={this.setStatus}
                  />
                </Fragment>
              );
            }
          }
        },
        {
          name: "Actions",
          label: "Actions",
          options: {
            customBodyRender: (value, index, id) => {
              return (
                <div>
                  <div
                    style={{
                      float: "left",
                      width: "25%"
                    }}
                  >
                    <NavLink
                      to={`${routes.CUSTOMERS_SAVE}/${
                        this.state.list[index.rowIndex].id
                      }`}
                    >
                      <i
                        className={"fa fa-pencil"}
                        style={{
                          marginRight: "5px",
                          float: "left"
                        }}
                      />
                    </NavLink>
                  </div>
                  <div>
                    <i
                      className={"fa fa-trash"}
                      style={{
                        marginRight: "5px",
                        float: "left",
                        cursor: "pointer",
                        color: "#c90d04"
                      }}
                      onClick={() =>
                        this.handleShowDeleteAlert([
                          this.state.list[index.rowIndex].id
                        ])
                      }
                    />
                  </div>
                </div>
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
        customToolbarSelect: () => {
          return (
            <div className={"multiselect-custom-div"}>
              <button
                className={"btn btn-primary"}
                data-toggle="tooltip"
                title="Status Active"
                onClick={() => this.onMultiDelete("Active")}
              >
                <i className="fa fa-unlock-alt" aria-hidden="true" />
              </button>
              <button
                className={"btn btn-primary"}
                data-toggle="tooltip"
                title="Status Inactive"
                onClick={() => this.onMultiDelete("In Active")}
              >
                <i className="fa fa-lock" aria-hidden="true" />
              </button>
              <button
                className={"btn btn-danger"}
                data-toggle="tooltip"
                title="Multi Delete"
                onClick={() => this.onMultiDelete("Delete")}
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
            </div>
          );
        },
        customToolbar: () => {
          return (
            <NavLink to={`${routes.CUSTOMERS_CREATE}`}>
              <div className="bg-circle" />
              <i className="fa fa-plus" aria-hidden="true" />
            </NavLink>
          );
        },

        onTableChange: (action, tableState) => {
          // console.log(tableState.announceText.split(": ")[1]);
          // console.log(tableState.announceText.split(": ")[0].split(" ")[4]);
          if (action === "rowsSelect") {
            this.setState({ selectedRows: tableState["selectedRows"]["data"] });
          }
          if (
            [
              "sort",
              "filterChange",
              "changeRowsPerPage",
              "changePage",
              "search"
            ].indexOf(action) > -1
          ) {
            if (tableState.announceText) {
              this.state.name = tableState.announceText
                .split(": ")[0]
                .split(" ")[4];
              // this.setState({
              //   name: tableState.announceText.split(": ")[0].split(" ")[4]
              // });
            }

            this.setState({
              limit: tableState.rowsPerPage,
              page: tableState.page
            });
            tableState.announceText
              ? (this.state.order = tableState.announceText.split(": ")[1])
              : (this.state.order = "asc");
            action === "search"
              ? (this.state.keyword = tableState.searchText)
              : (this.state.keyword = tableState["filterList"][1][0]);

            const sort = {};

            if (
              tableState.announceText &&
              tableState.announceText.split(": ")[0].split(" ")[4]
            ) {
              sort[
                tableState.announceText.split(": ")[0].split(" ")[4] === "email"
                  ? "email"
                  : "firstName"
              ] =
                tableState.announceText.split(": ")[1] === "ascending"
                  ? "asc"
                  : "desc";
            }

            if (action === "search") {
              this.getApiDebounseCall({
                sort,
                limit: tableState.rowsPerPage,
                page: tableState.page,
                keyword:
                  action === "search"
                    ? tableState.searchText
                    : tableState["filterList"][1][0]
              });
            } else {
              this.getApiCall({
                sort,
                limit: tableState.rowsPerPage,
                page: tableState.page,
                keyword:
                  action === "search"
                    ? tableState.searchText
                    : tableState["filterList"][1][0]
              });
            }
          }
        }
      }
    };
  }

  onMultiDelete = type => {
    let ids = [];
    for (let i = 0; i < this.state.selectedRows.length; i++) {
      ids.push(this.state.list[this.state.selectedRows[i].index].id);
    }
    if (type !== "Delete") {
      const { dispatch } = this.props;
      dispatch(
        adminStatusUpdateCustomerRequest({
          ids: ids,
          status: type
        })
      );
      let newState = Object.assign({}, this.state);
      for (let i = 0; i < newState["list"].length; i++) {
        newState["list"][i].active = type === "Active";
      }
      let payload = { data: { docs: [...newState["list"]] } };
      dispatch(adminGetCustomersSuccess(payload));
    } else {
      this.handleShowDeleteAlert(ids);
    }
  };

  setStatus = data => {
    let newState = Object.assign({}, this.state);
    newState["list"][data.index].active = !newState["list"][data.index].active;
    this.setState({ newState });

    const { dispatch } = this.props;

    dispatch(
      adminStatusUpdateCustomerRequest({
        ids: [newState["list"][data.index].id],
        status: data.value ? "In Active" : "Active"
      })
    );
    let payload = { data: { docs: [...newState["list"]] } };
    dispatch(adminGetCustomersSuccess(payload));
  };

  render() {
    const { selectedId } = this.state;

    return (
      <div>
        <div className={"breadcrum-div"}>
          <Breadcrumb>
            <BreadcrumbItem>
              <NavLink to={"/dashboard"}>
                <i className="fa fa-tachometer" aria-hidden="true" />
                <span>Dashboard</span>
              </NavLink>
            </BreadcrumbItem>
            <BreadcrumbItem active>Customers</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className={"container"}>
          <MUIDataTable
            title={
              <div>
                Customers List
                <hr />
              </div>
            }
            data={this.state.list}
            // data={list ? list["docs"] : []}
            columns={this.state.columns}
            options={this.state.options}
          />
          {1 && (
            <Confirmation
              open={selectedId.length > 0}
              title="Delete"
              text="Are you sure you want to delete record?"
              handleClose={this.handleCancelDelete}
              handleSuccess={() => this.handleDelete()}
            />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const data = {
      sort: {
        created: "asc"
      },
      limit: 10,
      page: 0,
      keyword: ""
    };
    this.getApiCall(data);
  }

  getApiDebounseCall = debounce(data => {
    let newState = Object.assign({}, this.state);
    newState["options"]["rowsPerPage"] = data.limit;
    this.setState(newState);
    const { dispatch } = this.props;
    let payload = {
      limit: data.limit,
      page: data.page + 1,
      sort: data.sort,
      keyword: data.keyword
    };
    dispatch(adminGetCustomersRequest(payload));
  }, 500);

  getApiCall = data => {
    let newState = Object.assign({}, this.state);
    newState["options"]["rowsPerPage"] = data.limit;
    this.setState(newState);

    const { dispatch } = this.props;
    let payload = {
      limit: data.limit,
      page: data.page + 1,
      sort: data.sort,
      keyword: data.keyword
    };

    dispatch(adminGetCustomersRequest(payload));
  };

  componentWillReceiveProps(props) {
    if (props.list) {
      let newState = Object.assign({}, this.state);
      newState["options"].count = props.list.total || this.state.total;
      newState["list"] = props.list.docs;
      newState["total"] = props.list.total || this.state.total;
      this.setState(newState);
    }
  }

  handleNavigation = url => {
    const { history } = this.props;
    history.push(url);
  };

  handleShowDeleteAlert = id => {
    let newState = Object.assign({}, this.state);
    for (let i = 0; i < id.length; i++) {
      newState["selectedId"][i] = id[i];
    }
    newState["deleteAlert"] = true;
    this.setState({ newState });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch(
      adminStatusUpdateCustomerRequest({
        ids: [...this.state.selectedId],
        status: "Delete"
      })
    );

    let newState = Object.assign({}, this.state);

    let length = newState["selectedId"].length;

    for (let i = 0; i < length; i++) {
      this.state["selectedId"].splice(0, 1);
    }
    this.setState({ deleteAlert: false });

    const sort = {};
    sort[this.state.name] = this.state.order;

    window.setTimeout(() => {
      this.getApiCall({
        limit: this.state.limit,
        page: this.state.page,
        sort: sort,
        keyword: this.state.keyword
      });
    }, 300);
  };

  handleCancelDelete = () => {
    this.setState({ deleteAlert: false, selectedId: [] });
  };
}

const mapStateToProps = state => {
  const { customers } = state;

  return {
    list: customers.get("customers"),
    changeStatus: customers.get("changeStatus")
  };
};

export default connect(mapStateToProps)(Listing);
