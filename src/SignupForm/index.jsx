import React from "react";
import SignupFormState from "./SignupFormState";
import SignupFields from "./SignupFields";
import SignupSubmit from "./SignupSubmit";
import "./signup-form.css";

export default class SignupForm extends React.Component {
  render() {
    return (
      <SignupFormState>
        {signupStore => {
          return (
            <SignupSubmit signupStore={signupStore}>
              <SignupFields signupStore={signupStore} />
            </SignupSubmit>
          );
        }}
      </SignupFormState>
    );
  }
}
