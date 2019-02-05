import React from "react";
import PropTypes from "prop-types";
import SignupFormState from "./SignupFormState";
import EmailAddressInput from "./EmailAddressInput";
import { Form, Input, Button, Icon } from "antd";
import * as types from "./types";

class SignupForm extends React.Component {
  static propTypes = {
    form: PropTypes.object
  };

  handleSubmit = state => event => {
    event.preventDefault();
    console.log(state);
  };

  action = (type, event) => ({
    type,
    payload: event.currentTarget.value
  });

  injectFields = (state, reducer) => {
    return (
      <Form onSubmit={this.handleSubmit(state)} className="signup-form">
        <EmailAddressInput
          style={{ marginBottom: "1rem" }}
          value={state.email}
          reducer={reducer}
        />
        <Input
          className="has-error"
          style={{ marginBottom: "1rem" }}
          value={state.password}
          onChange={evt => reducer(this.action(types.UPDATE_PASSWORD, evt))}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <Input
          style={{ marginBottom: "1rem" }}
          value={state.confirmPassword}
          onChange={evt => reducer(this.action(types.CONFIRM_PASSWORD, evt))}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <Button block type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form>
    );
  };

  render() {
    return <SignupFormState render={this.injectFields} />;
  }
}

export default Form.create({ name: "signup" })(SignupForm);
