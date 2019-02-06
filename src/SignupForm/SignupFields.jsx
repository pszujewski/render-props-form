import React from "react";
import PropTypes from "prop-types";
import SignupSubmit from "./SignupSubmit";
import InputField from "../InputField";
import { isEmptySetup } from "../InputField/utils";
import { Button, Icon } from "antd";
import * as types from "./types";

const { UPDATE_EMAIL, UPDATE_PASSWORD, CONFIRM_PASSWORD } = types;

export default class SignupFields extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    reducer: PropTypes.func
  };

  getEmailInputConfig = (state, reducer) => {
    return {
      id: "email",
      label: "Email",
      placeholder: "Email address",
      getPrefix: () => (
        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
      ),
      value: state.email,
      onChange: evt => reducer(this.action(UPDATE_EMAIL, evt)),
      hasError: isEmptySetup(state)("email") && state.error
    };
  };

  getPasswordInputConfig = (state, reducer) => {
    const pwsDoNotMatch = this.passwordsNoMatch();
    return {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      getPrefix: () => (
        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      ),
      value: state.password,
      onChange: evt => reducer(this.action(UPDATE_PASSWORD, evt)),
      hasError:
        (isEmptySetup(state)("password") && state.error) || pwsDoNotMatch,
      errorMessage: this.getPwErrorMessage(pwsDoNotMatch)
    };
  };

  getConfirmPWInputConfig = (state, reducer) => {
    const pwsDoNotMatch = this.passwordsNoMatch();
    return {
      id: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm password",
      getPrefix: () => (
        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
      ),
      value: state.confirmPassword,
      onChange: evt => reducer(this.action(CONFIRM_PASSWORD, evt)),
      hasError:
        (isEmptySetup(state)("confirmPassword") && state.error) ||
        pwsDoNotMatch,
      errorMessage: this.getPwErrorMessage(pwsDoNotMatch)
    };
  };

  passwordsNoMatch() {
    const { state } = this.props;
    return state.password !== state.confirmPassword && state.error;
  }

  getPwErrorMessage(pwsDoNotMatch) {
    return pwsDoNotMatch ? "Password fields must match!" : "Required!";
  }

  action = (type, event) => ({
    type,
    payload: event.currentTarget.value
  });

  getButton() {
    const style = { marginTop: "1rem" };
    return (
      <Button block style={style} type="primary" htmlType="submit">
        Sign up
      </Button>
    );
  }

  render() {
    const { state: s, reducer: r } = this.props;
    return (
      <SignupSubmit state={s} reducer={r}>
        <React.Fragment>
          <InputField inputConfig={this.getEmailInputConfig(s, r)} />
          <InputField inputConfig={this.getPasswordInputConfig(s, r)} />
          <InputField inputConfig={this.getConfirmPWInputConfig(s, r)} />
          {this.getButton()}
        </React.Fragment>
      </SignupSubmit>
    );
  }
}
