import React from "react";
import PropTypes from "prop-types";

import InputField from "../InputField";
import { isEmptySetup } from "../InputField/utils";

import { Button, Icon } from "antd";
import * as errorTypes from "./errorTypes";

const { REQUIRE_INPUT, PASSWORDS_MATCH_FAIL, INVALID_EMAIL } = errorTypes;

export default class SignupFields extends React.Component {
  static propTypes = {
    signupStore: PropTypes.object,
  };

  render() {
    const { signupStore } = this.props;
    const state = signupStore.getState();
    return (
      <React.Fragment>
        <InputField
          id="email"
          label="Email"
          placeholder="Email address"
          value={state.email}
          update={signupStore.update}
          hasError={this.emailFieldHasError(state.formErrorType)}
          getPrefix={this.getIcon("user")}
          errorMessage="Valid email is required!"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          getPrefix={this.getIcon("lock")}
          value={state.password}
          update={signupStore.update}
          hasError={this.passwordFieldHasError("password")}
          errorMessage={this.getPasswordFieldErrorMessage(state.formErrorType)}
        />
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          getPrefix={this.getIcon("lock")}
          value={state.confirmPassword}
          update={signupStore.update}
          hasError={this.passwordFieldHasError("confirmPassword")}
          errorMessage={this.getPasswordFieldErrorMessage(state.formErrorType)}
        />
        <Button
          block
          style={{ marginTop: "1rem" }}
          type="primary"
          htmlType="submit">
          Sign up
        </Button>
      </React.Fragment>
    );
  }

  emailFieldHasError(formErrorType) {
    const emailInvalid = this.hasInvalidEmail(formErrorType);
    const isEmptyField = this.hasEmptyInputError("email")
    return emailInvalid || isEmptyField;
  }

  hasInvalidEmail(formErrorType) {
    return formErrorType === INVALID_EMAIL;
  }

  hasEmptyInputError(fieldName) {
    const s = this.props.signupStore.getState();
    const isEmpty = isEmptySetup(s);
    return isEmpty(fieldName) && s.formErrorType === REQUIRE_INPUT;
  }

  passwordFieldHasError(fieldName) {
    const s = this.props.signupStore.getState();
    const isEmpty = this.hasEmptyInputError(fieldName);
    return isEmpty || s.formErrorType === PASSWORDS_MATCH_FAIL;
  }

  getPasswordFieldErrorMessage(formErrorType) {
    const noMatchError = formErrorType === PASSWORDS_MATCH_FAIL;
    return noMatchError ? "Passwords must match!" : "Requires input!";
  }

  getIcon = name => () => {
    return <Icon type={name} style={{ color: "rgba(0,0,0,.25)" }} />;
  };
}
