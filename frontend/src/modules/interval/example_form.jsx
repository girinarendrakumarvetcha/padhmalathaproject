import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { textField, dateField } from "../../helpers/controls";
import { NavLink } from "react-router-dom";
import { routes } from "../../config/routes";
import {
  required,
  validEmail,
  validPhone,
  validDob,
  uniqueEmailCall
} from "../../helpers/validators";
// import { adminGetCustomerUniqyeMailRequest } from "../../actions/customers";

const requiredFname = required("First Name");
const requiredLname = required("Last Name");
const requiredEmail = required("Email");
const requiredPhone = required("Phone Number");
const requiredDob = required("Date of Birth");

class Form extends Component {
  getAsyncEmail = evt => {
    // this.setState({ uniqueCall: true });
    // this.props.dispatch(adminGetCustomerUniqyeMailRequest({email:evt.target.value}));
  };

  render() {
    const { handleSubmit, loading, getLoading, uniqueEmail } = this.props;

    return (
      <div className={"card-body col-sm-6 offset-md-3"}>
        <form
          name={"save_app"}
          className="app-create-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group row">
            <label htmlFor={"firstName"} className="col-sm-3 col-form-label">
              First Name :
            </label>
            <div className="col-sm-9">
              <Field
                id="firstName"
                name="firstName"
                type="text"
                component={textField}
                label="First Name"
                onChange={evt => {
                  var re = /^[a-z\d'\s]+$/i;
                  if (!re.test(String(evt.target.value)) && evt.target.value) {
                    evt.preventDefault();
                  }
                }}
                validate={[requiredFname]}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-sm-3 col-form-label">
              Last Name :
            </label>
            <div className="col-sm-9">
              <Field
                id="lastName"
                name="lastName"
                type="text"
                component={textField}
                label="Last Name"
                onChange={evt => {
                  var re = /^[a-z\d'\s]+$/i;
                  if (!re.test(String(evt.target.value)) && evt.target.value) {
                    evt.preventDefault();
                  }
                }}
                validate={[requiredLname]}
              />
            </div>
          </div>
          <div className="form-group row" onBlur={e => this.getAsyncEmail(e)}>
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email :
            </label>
            <div className="col-sm-9">
              <Field
                id="email"
                name="email"
                type="text"
                component={textField}
                label="Email"
                validate={
                  uniqueEmail
                    ? [requiredEmail, validEmail, uniqueEmailCall]
                    : [requiredEmail, validEmail]
                }
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Phone NO :
            </label>
            <div className="col-sm-9">
              <Field
                id="mobile"
                name="mobile"
                type="text"
                component={textField}
                label="mobile"
                validate={[requiredPhone, validPhone]}
                onChange={evt => {
                  var re = /^(0|[1-9][0-9]*)$/;
                  if (!re.test(String(evt.target.value)) && evt.target.value) {
                    evt.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="birthdate" className="col-sm-3 col-form-label">
              DOB :
            </label>
            <div className="col-sm-9 test-dp-1">
              <Field
                id="birthdate"
                name="birthdate"
                type="date"
                component={dateField}
                label="Date Of Birth"
                validate={[requiredDob, validDob]}
              />
            </div>
          </div>
          <NavLink
            to={routes.CUSTOMERS}
            className={"btn btn-primary col-sm-5 app-submit"}
          >
            Cancel
          </NavLink>
          <button
            type="submit"
            className={"btn btn-primary col-sm-5 app-submit"}
            disabled={loading || getLoading}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

Form = reduxForm({
  form: "save_customer"
})(Form);

const mapStateToProps = state => {
  const { customers, slider } = state;

  return {
    getLoading: customers.get("loading"),
    loading: customers.get("saveLoading"),
    isOpen: slider.get("isSliderOpen"),
    uniqueEmail: customers.get("unique")
  };
};

export default connect(mapStateToProps)(Form);
