import React from "react";
import PropTypes from "prop-types";
import InputField from "../InputField";
import { Icon } from "antd";
import * as types from "./types";

const { UPDATE_EMAIL } = types;

export default class EmailAddressInput extends React.Component {
  static propTypes = {
    emailValue: PropTypes.string,
    formHasError: PropTypes.bool,
    reducer: PropTypes.func
  };

  getUserIcon = () => {
    return <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />;
  };

  hasError() {
    const { emailValue, formHasError } = this.props;
    return emailValue.length === 0 && formHasError;
  }

  action = event => ({
    type: UPDATE_EMAIL,
    payload: event.currentTarget.value
  });

  render() {
    const { emailValue, reducer } = this.props;
    return (
      <InputField
        id="email"
        label="Email"
        placeholder="Email address"
        value={emailValue}
        hasError={this.hasError()}
        getPrefix={this.getUserIcon}
        onChange={evt => reducer(this.action(evt))}
      />
    );
  }
}
