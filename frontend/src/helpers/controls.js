import React from "react";
import Select from "react-select";
import CKEditor from "@ckeditor/ckeditor5-react";
import "react-datepicker/dist/react-datepicker.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKConfig } from "../config/generalConfig";
import DatePicker from "react-datepicker";
import moment from "moment";

export const textField = props => {
  return (
    <div>
      <div>
        <input
          className={"form-control"}
          {...props.input}
          placeholder={props.label}
          type={props.type}
          maxLength={50}
          value={props.input.value}
        />
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

export const textAreaField = props => {
  return (
    <div>
      <div>
        <textarea
          className={"form-control"}
          {...props.input}
          placeholder={props.label}
          type={props.type}
          maxLength={50}
          value={props.input.value}
        />
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

export const redioField = props => {
  return (
    <div>
      <div>
        {/* <input
          // className={"form-control"}
          {...props.input}
          placeholder={props.label}
          type={"radio"}
          value={props.id}
          checked={props.id === props.input.value}
        /> */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            {...props.input}
            value={props.id}
            id={props.id}
            checked={props.id === props.input.value}
          />
          <label className="form-check-label" htmlFor={props.id}>
            {props.label}
          </label>
        </div>
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
  props.input.value = JSON.parse(props.data).find(element => {
    return element.value === props.input.value.value;
  });

  return (
    <div>
      <div>
        <Select
          menuPlacement={"bottom"}
          maxMenuHeight={"1%"}
          name={props.input.name}
          options={JSON.parse(props.data)}
          value={props.input.value}
          onChange={props.input.onChange}
          isLoading={props.data ? false : true}
          isClearable={true}
          isSearchable={true}
        />
        {/* <select
          className={"form-control"}
          placeholder={props.label}
          {...props.input}
          value={props.input.value}
        >
          <option value={""}>---- Select {props.label} ---- </option>
          {props.data &&
            props.data.map((element, index) => {
              return (
                <option value={element.id} key={index}>
                  {element.name}
                </option>
              );
            })}
        </select> */}
        {props.meta.touched &&
          ((props.meta.error && (
            <div className={"display-error"}>
              <span style={{ color: "#CC0000", fontSize: 15, marginBottom: 5 }}>
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
  return (
    <div>
      <div>
        <DatePicker
          className={"form-control"}
          {...props.input}
          placeholderText={props.label}
          // dateFormat="YYYY-MM-DD"
          selected={props.input.value ? new Date(props.input.value) : null}
          onChange={event => {
            props.input.onChange(moment(event).format("YYYY-MM-DD"));
          }}
        />
        {props.meta.touched &&
          ((props.meta.error && (
            <div className={"display-error"}>
              <span
                style={{
                  color: "#CC0000",
                  fontSize: 15
                }}
              >
                {props.meta.error}
              </span>
            </div>
          )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};

export const CKeditor = props => {
  return (
    <div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={props.input.value}
          content={props.input.value}
          name={props.input.name}
          config={CKConfig}
          onChange={(event, editor) => {
            props.input.onChange(editor.getData());
          }}
        />
        {props.meta.touched &&
          ((props.meta.error && (
            <div className={"display-error"}>
              <span style={{ color: "#CC0000", fontSize: 15, marginBottom: 5 }}>
                {props.meta.error}
              </span>
            </div>
          )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    </div>
  );
};
