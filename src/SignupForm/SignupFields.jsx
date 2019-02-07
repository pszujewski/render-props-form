import React from "react";
import PropTypes from "prop-types";
import SignupSubmit from "./SignupSubmit";
import EmailAddressInput from "./EmailAddressInput";
import PasswordInputs from "./PasswordInputs";
import { Button } from "antd";

export default class SignupFields extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    reducer: PropTypes.func
  };

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
          <EmailAddressInput
            reducer={r}
            emailValue={s.email}
            formHasError={s.error}
          />
          <PasswordInputs
            reducer={r}
            passwordValue={s.password}
            confirmPasswordValue={s.confirmPassword}
            formHasError={s.error}
          />
          {this.getButton()}
        </React.Fragment>
      </SignupSubmit>
    );
  }
}
