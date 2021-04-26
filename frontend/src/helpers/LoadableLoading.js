import React from "react";
import Image from "../assets/images/hblogo.jpg";
import "./helpers.scss";
export default function LoadableLoading(props) {
  if (props.error) {
    console.log("props.error", props.error);
    alert();
    return (
      <div>
        Error while loading component!
        <button type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking too long to load
        <button type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    );
  } else if (props.pastDelay) {
    return (
      <div>
        {/* <h1>This page is loading</h1>
        <h1>This page is loading</h1>
        <h1>This page is loading</h1>
        <h1>This page is loading</h1>
        <h1>This page is loading</h1>
        <h1>This page is loading</h1> */}
        <i className={"loading-image"}>
          <img src={Image} alt={""} width={"60%"} height={"30%"} />
        </i>
      </div>
    );
  } else {
    return null;
  }
}
