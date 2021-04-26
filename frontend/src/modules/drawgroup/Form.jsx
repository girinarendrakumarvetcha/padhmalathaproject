
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { inputField , selectField } from "../../helpers/domcontrols";
import { required } from "../../helpers/validators";
import apis from '../../api';
import { routes } from "../../config/routes";
import FormButtons from '../../Layout/AppFormButtons';
const requiredlName = required("Group Name");
const requiredShortCode = required("Short Code");
const requiredCustomers = required("Customers");

class DrawGroupForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            customer_dropdown : [],
            selected_customer_dropdown : []
        }
    }

    componentDidMount = async () => {
        let customer_dropdown_arr = [];
        let selected_cus_drpdwn = [];
        await apis.customerDropdown().then(customer_dropdown => {
            customer_dropdown_arr  = customer_dropdown.data.data;
        })
        const url_params = this.props.match.params;
        if(url_params.id !== undefined){
            apis.drawGroupRecordFetch(url_params.id).then(res => {
                if(typeof res.data.data.group_customers_ids != 'undefined'){
                    const custiomer_ids = res.data.data.group_customers_ids.split(',');
                    const cus_drpdwn_arr = customer_dropdown_arr;

                    for(var i in cus_drpdwn_arr){
                        if(custiomer_ids.includes(cus_drpdwn_arr[i]['value'])){
                            selected_cus_drpdwn.push(cus_drpdwn_arr[i]);
                        }
                    }
                    
                }
                
                this.setState({ 
                    selected_customer_dropdown : selected_cus_drpdwn,
                    customer_dropdown : customer_dropdown_arr
                });
                this.props.initialize( res.data.data); 
            });
        }
        // this.setState({
        //     customer_dropdown : customer_dropdown.data.data,
        // })
        
    }
    
    
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className='form-container'>
                <form  onSubmit={ handleSubmit } >
                    <div className="form-row">
                        <Field
                            type="text"
                            name="group_name" 
                            id='group_name'
                            label="Group Name"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredlName]}
                        />
                        <Field
                            type="text"
                            name="group_short_code" 
                            id='group_short_code'
                            label="Short Code"  
                            component={inputField}
                            containerclass='col-md-6'
                            validate={[requiredShortCode]}

                        />
                    </div>
                    <div className="form-row">
                    {this.state.customer_dropdown.length && 
                    <Field
                            type="text"
                            name="group_customers" 
                            id='group_customers'
                            label="Customers" 
                            defaultValue={JSON.stringify(this.state.selected_customer_dropdown)} 
                            component={selectField}
                            ismultiple={true}   
                            data={JSON.stringify(this.state.customer_dropdown)}
                            containerclass='col-md-12'
                            validate={[requiredCustomers]}
                        />
                    }
                    </div>
                    <FormButtons listUrl={routes.DRAW_GROUP_LIST}/>
                </form>
            </div>
        );
    }
};
export default reduxForm({
    form: 'draw_group_form'
  })(DrawGroupForm);
