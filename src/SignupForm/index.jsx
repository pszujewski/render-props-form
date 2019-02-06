import React from "react";
import SignupFormState from "./SignupFormState";
import SignupFields from "./SignupFields";
import "./signup-form.css";

export default class SignupForm extends React.Component {
  getFields = (state, reducer) => {
    return <SignupFields state={state} reducer={reducer} />;
  };

  render() {
    return (
      <SignupFormState>
        {(state, reducer) => this.getFields(state, reducer)}
      </SignupFormState>
    );
  }
}
