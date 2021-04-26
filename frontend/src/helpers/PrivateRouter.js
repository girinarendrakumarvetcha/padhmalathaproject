import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "../config/routes";
import asyncLoadable from "./AsyncLoadable";
// import HeaderWrapper from "../components/template/HeaderWrapper";
const HeaderWrapper = asyncLoadable(() =>
  import("../components/template/HeaderWrapper")
);

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem("token");
        if (token) {
          return (
            <Fragment>
              <HeaderWrapper />
              <Component {...props} />
            </Fragment>
          );
        }
        return <Redirect to={routes.LOGIN} />;
      }}
    />
  );
};

export default PrivateRouter;
