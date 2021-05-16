import React from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import classnames from "classnames";
import 'react-dropdown/style.css';

//import Dropdown from 'react-dropdown';
//import AsyncSelect from 'react-select/async';



export const inputField = props => {
  const noLabelRequired = (props.noLabelRequired)?props.noLabelRequired: false;
  // if(props.input.name === 'amt_installment_step_no_0'){
  //   console.log(props);
  // }
  
  return (
    <div className={classnames('form-group', props.containerclass)}>
      
      {!noLabelRequired  && 
        <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
      }
      <input 
            type={props.type}
            name={props.input.name}
            className={classnames('form-control', props.inpclass)}
            placeholder={props.label ? props.label : props.placeholder}
            id={props.id}
            disabled = {props.disabled}
            {...props.input} 
            />
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};

export const viewField = props => {
  const noLabelRequired = (props.noLabelRequired)?props.noLabelRequired: false;
  return (
    <div className={classnames('form-group', props.containerclass)}>
      
      {!noLabelRequired  && 
        <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
      }
      
      <input 
            type={props.type}
            name={props.input.name}
            className={classnames('form-control', props.inpclass)}
            placeholder={props.label ? props.label : props.placeholder}
            id={props.id}
            readOnly = 'readonly'
            value={props.defaultValue}
            {...props.input} 
            />
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};

export const selectFieldDup= props => {
 
 
let default_value = JSON.parse(props.defaultValue);
console.log(default_value);
console.log(default_value.value);
 let options = [
  { label: 2021, value: 2021 },
  { label: 2020, value: 2020 },
  { label: 2019, value: 2019 },
  { label: 2018, value: 2018 },
  { label: 2017, value: 2017 },
  { label: 2016, value: 2016 },
  { label: 2015, value: 2015 },
  { label: 2014, value: 2014 },
  { label: 2013, value: 2013 },
  { label: 2012, value: 2012 },
  { label: 2011, value: 2011 },
  { label: 2010, value: 2010 },
  { label: 2009, value: 2009 },
  { label: 2008, value: 2008 },
  { label: 2007, value: 2007 },
  { label: 2006, value: 2006 },
  { label: 2005, value: 2005 },
  { label: 2004, value: 2004 },
  { label: 2003, value: 2003 },
  { label: 2002, value: 2002 },
  { label: 2001, value: 2001 },
  { label: 2000, value: 2000 },
]


return (
    <div className={classnames('form-group', props.containerclass)}>
      <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
      <Select
                options={options}
                //value= {'2002'}
                defaultValue={{ label: 2002, value: 2002 }}
            />
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};
export const selectField = props => {
 
  // props.input.value = JSON.parse(props.data).find(element => {
  //   return element.value === props.input.value.value;
  // });
  //console.log(props);
  
  //props.ismultiple = props.ismultiple ? props.ismultiple : false ;
// console.log(props);
// console.log(props.defaultValue);
// console.log(JSON.parse(props.data));
// if(props.input.value == null && props.defaultValue  != null ){
//   props.input.value = props.defaultValue 
// }
//debugger;
// if(props.defaultValue != ''){

//   console.log(props.defaultValue);  
// }
// if(props.data != ''){

//   console.log(props.data);  
// }
if(props.id == 'ma_interval_period')
  console.log(props);
let default_value = {};

if(typeof(props.defaultValue) != "undefined" && props.defaultValue != ''){
   default_value = JSON.parse(props.defaultValue);
}

return (
    <div className={classnames('form-group', props.containerclass)}>
      <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
        <Select 
          menuPlacement={"bottom"}
          maxMenuHeight={"1%"}
          name={props.input.name}
          options={JSON.parse(props.data)}
          defaultValue = {Object.keys(default_value).length && default_value}
          onChange={props.input.onChange}
          isLoading={props.data ? false : true}
          isClearable={true}
          isSearchable={true}
          isMulti = {props.ismultiple}
          className={classnames('form-group', props.inpclass)}
        />
                    
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};

export const selectDropdown = props => {
 
 
  return (
    <div className={classnames('form-group', props.containerclass)}>
      <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
      <Select          
          name={props.input.name}
          defaultValue = {props.defaultValue}
          options={JSON.parse(props.data)}
          
          isLoading={props.data ? false : true}
          isClearable={true}
          isSearchable={true}
          isMulti = {props.ismultiple}
          className={classnames('form-group', props.inpclass)}
        />
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};

export const dateField = props => {
  const noLabelRequired = (props.noLabelRequired)?props.noLabelRequired: false;
  return (
    <div className={classnames('form-group', props.containerclass)}>
      
      {!noLabelRequired  && 
        <label className="control-label" htmlFor={props.input.name} >{props.label}</label>
      }
      <DatePicker
          className={"form-control"}
          {...props.input}
          placeholderText={props.label}
          // dateFormat="YYYY-MM-DD"
          wrapperClassName="form-group"
          selected={props.input.value ? new Date(props.input.value) : null}
          onChange={event => {
            props.input.onChange(moment(event).format("YYYY-MM-DD"));
          }}
        />
      <div className='validator-content'>
        {props.meta.touched &&
            ((props.meta.error && (
              <div
                className={
                  props.meta.form === "login"
                    ? "display-error-login"
                    : "display-error"
                }
              >
                <span style={{ color: "#CC0000", fontSize: 15 }}>
                  {props.meta.error}
                </span>
              </div>
            )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};