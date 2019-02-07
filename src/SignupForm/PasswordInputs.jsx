import React from "react";
import PropTypes from "prop-types";
import InputField from "../InputField";
import { Icon } from "antd";
import * as types from "./types";

const { UPDATE_PASSWORD, CONFIRM_PASSWORD } = types;

export default class PasswordInputs extends React.Component {
  static propTypes = {
    passwordValue: PropTypes.string,
    confirmPasswordValue: PropTypes.string,
    formHasError: PropTypes.bool,
    reducer: PropTypes.func
  };

  getLockIcon = () => {
    return <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />;
  };

  passwordsAreNotMatch() {
    const { passwordValue, confirmPasswordValue, formHasError } = this.props;
    return passwordValue !== confirmPasswordValue && formHasError;
  }

  getErrorMessage() {
    const pwsDoNotMatch = this.passwordsAreNotMatch();
    return pwsDoNotMatch ? "Password fields must match!" : "Required!";
  }

  action = (type, event) => ({
    type,
    payload: event.currentTarget.value
  });

  hasError(fieldName) {
    const { formHasError } = this.props;

    const isEmpty = this.props[fieldName].length === 0;
    const pwsDoNotMatch = this.passwordsAreNotMatch();

    return (isEmpty || pwsDoNotMatch) && formHasError;
  }

  render() {
    const { reducer, passwordValue, confirmPasswordValue } = this.props;
    return (
      <React.Fragment>
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          getPrefix={this.getLockIcon}
          value={passwordValue}
          onChange={evt => reducer(this.action(UPDATE_PASSWORD, evt))}
          hasError={this.hasError("passwordValue")}
          errorMessage={this.getErrorMessage()}
        />
        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          getPrefix={this.getLockIcon}
          value={confirmPasswordValue}
          onChange={evt => reducer(this.action(CONFIRM_PASSWORD, evt))}
          hasError={this.hasError("confirmPasswordValue")}
          errorMessage={this.getErrorMessage()}
        />
      </React.Fragment>
    );
  }
}
