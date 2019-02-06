import React, { Component } from "react";
import SignupForm from "./SignupForm";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ width: 400, margin: "7rem auto" }}>
          <SignupForm />
        </div>
      </div>
    );
  }
}
