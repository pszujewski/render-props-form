import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { isEmptySetup } from "../InputField/utils";
import { SIGNUP_ERROR } from "./types";

export default class SignupSubmit extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    reducer: PropTypes.func,
    children: PropTypes.element
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.formHasError()) {
      return this.props.reducer({ type: SIGNUP_ERROR });
    }

    this.submitFormDataToApi();
  };

  formHasError() {
    const isEmpty = isEmptySetup(this.props.state);
    return (
      isEmpty("email") ||
      isEmpty("password") ||
      isEmpty("confirmPassword") ||
      this.passwordsDoNotMatch()
    );
  }

  passwordsDoNotMatch() {
    const { state } = this.props;
    return state.password !== state.confirmPassword;
  }

  submitFormDataToApi() {
    const formData = this.removeErrorFieldFromState();
    console.log("Submitting state", formData);
  }

  removeErrorFieldFromState() {
    const formData = {};
    const { state: s } = this.props;
    const stateFields = Object.keys(s).filter(key => key !== "error");
    stateFields.forEach(field => (formData[field] = s[field]));
    return formData;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        {this.props.children}
      </Form>
    );
  }
}
