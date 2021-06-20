
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { inputField, selectField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import { getShortCode, getFromShortCode } from "../../helpers/system_callbacks";
import apis from '../../api';
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
import { saveCustomerGroupDetailsRequest, getCustomerGroupDetailsRequest, resetCustomerGroupDetails } from '../../actions/customergroup';
import history from '../../config/history';
import { initialize } from "redux-form";

const requiredlName = required("Group Name");
const requiredShortCode = required("Short Code");
const requiredCustomers = required("Customers");

class CustomerGroupForm extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            customer_dropdown: [],
            selected_customer_dropdown: []
        }
    }
    handleUpdateShortCode = (event,props) => {
        props.change('group_short_code' ,getShortCode(event.target.value));
    }

    componentDidMount(){
        this.setState({
            customer_dropdown : this.props.customer_dropdown,
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form onSubmit={handleSubmit} >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="group_name"
                            id='group_name'
                            label="Group Name"
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredlName]}
                            //onChange = {(e) => {this.handleUpdateShortCode(e,this.props)}}
                            onChange = {(e) => { getFromShortCode(e,this.props,"group_short_code")}}
                        />
                        <Field
                            type="text"
                            name="group_short_code"
                            id='group_short_code'
                            label="Short Code"
                            disabled='disabled'
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredShortCode]}
                        />
                    </div>
                    <div className="form-row">
                        {this.props.customer_dropdown.length &&
                            <Field
                                type="text"
                                name="group_customers"
                                id='group_customers'
                                label="Customers"
                                defaultValue={JSON.stringify(this.props.selected_customer_dropdown)}
                                component={selectField}
                                ismultiple={true}
                                data={JSON.stringify(this.props.customer_dropdown)}
                                containerclass='col-md-12'
                                validate={[requiredCustomers]}
                            />
                        }
                    </div>
                    <FormButtons listUrl={routes.CUSTOMER_GROUP_LIST} />
                </form>
            </div>
        );
    }
};
// export default reduxForm({
//     form: 'draw_group_form'
//   })(CustomerGroupForm);


CustomerGroupForm = reduxForm({
    form: 'customer_group_form',
    enableReinitialize: true
})(CustomerGroupForm);

const mapStateToProps = state => {
    return {
        customer_dropdown : state.customer.dropdown_data,
        selected_customer_dropdown : state.customergroup.selected_customer_dropdown
    };
};

export default connect(mapStateToProps)(CustomerGroupForm);