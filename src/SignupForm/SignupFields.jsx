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
    const s = this.props.signupStore.getState();
    return (
      <React.Fragment>
        <InputField
          id="email"
          label="Email"
          placeholder="Email address"
          value={s.email}
          update={signupStore.update}
          hasError={this.hasInvalidEmail() || this.hasEmptyInputError("email")}
          getPrefix={this.getIcon("user")}
          errorMessage="Valid email is required!"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          getPrefix={this.getIcon("lock")}
          value={s.password}
          update={signupStore.update}
          hasError={this.passwordFieldHasError("password")}
          errorMessage={this.getPasswordFieldErrorMessage()}
        />
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          getPrefix={this.getIcon("lock")}
          value={s.confirmPassword}
          update={signupStore.update}
          hasError={this.passwordFieldHasError("confirmPassword")}
          errorMessage={this.getPasswordFieldErrorMessage()}
        />
        <Button
          block
          style={{ marginTop: "1rem" }}
          type="primary"
          htmlType="submit"
        >
          Sign up
        </Button>
      </React.Fragment>
    );
  }

  hasInvalidEmail() {
    const s = this.props.signupStore.getState();
    return s.formErrorType === INVALID_EMAIL;
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

  getPasswordFieldErrorMessage() {
    const s = this.props.signupStore.getState();
    const noMatchError = s.formErrorType === errorTypes.PASSWORDS_MATCH_FAIL;
    return noMatchError ? "Passwords must match!" : "Requires input!";
  }

  getIcon = name => () => {
    return <Icon type={name} style={{ color: "rgba(0,0,0,.25)" }} />;
  }
}
