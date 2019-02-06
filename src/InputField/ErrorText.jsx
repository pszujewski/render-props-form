import React from "react";
import PropTypes from "prop-types";

export default class ErrorText extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string
  };

  getErrorMessage() {
    const { errorMessage } = this.props;
    return errorMessage ? errorMessage : "Required input!";
  }

  render() {
    const style = {
      fontStyle: "italic",
      fontSize: 11
    };
    return (
      <div className="has-error">
        <div className="ant-form-explain" style={style}>
          {this.getErrorMessage()}
        </div>
      </div>
    );
  }
}
