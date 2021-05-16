import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apis from '../../api';
import { routes } from "../../config/routes";
import PageTitle from '../../Layout/AppMain/FormPageTitle';
import CustomerGroupForm from './Form';
import { saveCustomerGroupDetailsRequest, getCustomerGroupDetailsRequest, resetCustomerGroupDetails ,getSelectedCustomerDropdownRequest} from '../../actions/customergroup';
import { getCustomerDropdownRequest} from '../../actions/customer';
import history from '../../config/history';
import { initialize } from "redux-form";

class CustomerGroupInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer_dropdown: [],
            selected_customer_dropdown: []
        }
    }


    handleCustomerGroupInsert = (data) => {
        
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        if (id) {
            dispatch(saveCustomerGroupDetailsRequest({data,id,history}));
        } else {
            dispatch(saveCustomerGroupDetailsRequest({data,history}));
        }
    }

    componentDidMount = async () => {
        const {
            match: {
                params: { id }
            },
            dispatch
        } = this.props

        dispatch(resetCustomerGroupDetails());
        
        
        if (id) {
            dispatch(getCustomerGroupDetailsRequest(id));
        }
        
        dispatch(getCustomerDropdownRequest());
        dispatch(initialize('customer_group_form', this.props.form_data));

        dispatch(getSelectedCustomerDropdownRequest());
    }
    // componentWillReceiveProps = async(props) =>{
    //     console.log(props.form_data);
    //     let customer_dropdown_arr = [];
    //     let selected_cus_drpdwn = [];
        // await apis.customerDropdown().then(customer_dropdown => {
        //     customer_dropdown_arr  = customer_dropdown.data.data;
        // })
    //     if(typeof props.group_customers_ids != 'undefined'){
    //         const custiomer_ids = props.group_customers_ids.split(',');
    //         const cus_drpdwn_arr = customer_dropdown_arr;

    //         for(var i in cus_drpdwn_arr){
    //             if(custiomer_ids.includes(cus_drpdwn_arr[i]['value'])){
    //                 selected_cus_drpdwn.push(cus_drpdwn_arr[i]);
    //             }
    //         }
    //     }
        
    //     this.setState({ 
    //         selected_customer_dropdown : selected_cus_drpdwn,
    //         customer_dropdown : customer_dropdown_arr
    //     });
    // }   
    render(){
        return (
            <div>
                <PageTitle heading='Customer Group Form' />
                {/* <CustomerGroupForm  onSubmit={this.handleCustomerGroupInsert} {...this.props} initialValues={this.state} /> */}
                <CustomerGroupForm  onSubmit={this.handleCustomerGroupInsert} {...this.props}  />
            </div>
        );
    }
};
//export default withRouter(CustomerGroupInsert);
const mapStateToProps = state => {
    return {
        initialValues: state.customergroup.form_data,
        
    };
  };
  
  export default connect(mapStateToProps)(CustomerGroupInsert);
  
  
