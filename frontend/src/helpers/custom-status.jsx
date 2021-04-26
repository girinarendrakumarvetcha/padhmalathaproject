import React, { Component } from "react";
import { connect } from "react-redux";

class CustomStatus extends Component {
  render() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          readOnly
          onClick={() =>
            this.props.onChangeProperties({
              index: this.props.index,
              value: this.props.value
            })
          }
          checked={this.props.value}
        />
        <span className="slider round" />
      </label>
    );
  }
}
export default connect()(CustomStatus);
