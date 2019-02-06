import React from "react";
import SignupFormState from "./SignupFormState";
import SignupFields from "./SignupFields";
import "./signup-form.css";

export default class SignupForm extends React.Component {
  render() {
    return (
      <SignupFormState
        render={(state, reducer) => {
          return <SignupFields state={state} reducer={reducer} />;
        }}
      />
    );
  }
}
