import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { isEmptySetup } from "../InputField/utils";
import { SIGNUP_ERROR } from "./types";
import * as errorTypes from "./errorTypes";
import EmailValidator from "../utils/EmailValidator";

const { REQUIRE_INPUT, PASSWORDS_MATCH_FAIL, INVALID_EMAIL } = errorTypes;

export default class SignupSubmit extends React.Component {
  static propTypes = {
    signupStore: PropTypes.object,
    children: PropTypes.element,
  };

  emailValidator = new EmailValidator();

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        {this.props.children}
      </Form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const hasError = this.formHasError();

    if (hasError.result) {
      const action = { type: SIGNUP_ERROR, payload: hasError.errorType };
      return this.props.signupStore.update(action);
    }

    this.submitFormDataToApi();
  };

  formHasError() {   
    const state = this.props.signupStore.getState();

    if (this.hasEmptyFields(state)) {
      return { result: true, errorType: REQUIRE_INPUT };
    }

    if (!this.emailValidator.isValid(state.email)) {
      return { result: true, errorType: INVALID_EMAIL };
    }

    if (this.passwordsDoNotMatch(state)) {
      return { result: true, errorType: PASSWORDS_MATCH_FAIL };
    }

    return { result: false, errorType: null };
  }

  hasEmptyFields(state) {
    const isEmpty = isEmptySetup(state);
    return (
      isEmpty("email") ||
      isEmpty("password") ||
      isEmpty("confirmPassword")
    );
  }

  passwordsDoNotMatch(state) {
    return state.password !== state.confirmPassword;
  }

  submitFormDataToApi() {
    const formData = this.removeErrorFieldFromState();
    console.log("Submitting state", formData);
  }

  removeErrorFieldFromState() {
    const s = this.props.signupStore.getState();

    const formData = {};
    const stateFields = Object.keys(s).filter(key => key !== "error");

    stateFields.forEach(field => (formData[field] = s[field]));
    return formData;
  }
}
