import React , { Component } from 'react';
import { NavLink } from "react-router-dom";

class CusLisToolBarBtns extends Component { 

  render() {
    const { addLink } = this.props;
    
    return (
      <NavLink to={addLink}>
        <span>Add</span>
      </NavLink>
    );
  }
}
export default CusLisToolBarBtns;