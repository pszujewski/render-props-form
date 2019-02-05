import React from "react";
import PropTypes from "prop-types";
import * as types from "./types";

export default class SignupFormState extends React.Component {
  static propTypes = {
    render: PropTypes.func
  };

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: false
  };

  reducer = action => {
    switch (action.type) {
      case types.SIGNUP_ERROR:
        return this.setState({ error: true });
      default:
        const field = this.getFieldNameFromAction(action.type);
        return this.setState({ [field]: action.payload, error: false });
    }
  };

  getFieldNameFromAction(actionType) {
    switch (actionType) {
      case types.UPDATE_EMAIL:
        return "email";
      case types.UPDATE_PASSWORD:
        return "password";
      case types.CONFIRM_PASSWORD:
      default:
        return "confirmPassword";
    }
  }

  render() {
    return this.props.render(this.state, this.reducer);
  }
}
