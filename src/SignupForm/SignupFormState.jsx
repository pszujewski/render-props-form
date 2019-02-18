import React from "react";
import PropTypes from "prop-types";
import { UPDATE_INPUT_FIELD } from "../InputField/actionTypes";
import * as types from "./types";

export default class SignupFormState extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    formErrorType: null // string enum; see errorTypes
  };

  render() {
    return this.props.children(this.getSignupStore());
  }

  getSignupStore = () => ({
    getState: () => this.state,
    update: action => this.reducer(action),
  });

  reducer = action => { 
    switch (action.type) {
      case types.SIGNUP_ERROR:
        return this.setState({ formErrorType: action.payload });
      case UPDATE_INPUT_FIELD:
        return this.updateInputField(action);
      default:
        break;
    }
  };

  updateInputField(action) {
    const { payload: p } = action;
    if (p && p.fieldName && typeof p.nextValue === "string") {
      const field = p.fieldName;
      this.setState({ [field]: p.nextValue, formErrorType: null });
    }
  }
}
