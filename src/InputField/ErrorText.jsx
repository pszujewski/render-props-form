import React from "react";
import PropTypes from "prop-types";

export default class ErrorText extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string
  };

  render() {
    return (
      <div className="has-error">
        <div className="ant-form-explain" style={this.getStyle()}>
          {this.getErrorMessage()}
        </div>
      </div>
    );
  }

  getErrorMessage() {
    const { errorMessage } = this.props;
    return errorMessage ? errorMessage : "Required input!";
  }

  getStyle = () => ({
    fontStyle: "italic",
    fontSize: 11,
  });
}
