import React from "react";
import PropTypes from "prop-types";
import { Icon, Input } from "antd";
import * as types from "./types";

export default class EmailAddressInput extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    // passed in from parent
    value: PropTypes.string,
    reducer: PropTypes.func,
    style: PropTypes.object
  };

  action = event => ({
    type: types.UPDATE_EMAIL,
    payload: event.currentTarget.value
  });

  render() {
    const { value, reducer, style } = this.props;
    return (
      <Input
        style={style}
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Email"
        value={value}
        onChange={evt => reducer(this.action(evt))}
      />
    );
  }
}
