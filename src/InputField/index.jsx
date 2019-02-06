import React from "react";
import PropTypes from "prop-types";
import ErrorText from "./ErrorText";
import { Form, Input } from "antd";

export default class InputField extends React.Component {
  static propTypes = {
    inputConfig: PropTypes.object
  };

  getPrefix() {
    const { inputConfig } = this.props;
    if (typeof inputConfig.getPrefix === "function") {
      return inputConfig.getPrefix();
    }
    return null;
  }

  getInputClassNames() {
    const { inputConfig } = this.props;
    if (inputConfig.hasError) {
      return "has-error";
    }
  }

  render() {
    const { inputConfig } = this.props;
    return (
      <Form.Item className="custom-input-field" label={inputConfig.label}>
        <Input
          autoComplete="off"
          id={inputConfig.id}
          type={inputConfig.type ? inputConfig.type : "text"}
          name={inputConfig.id}
          className={this.getInputClassNames()}
          prefix={this.getPrefix()}
          placeholder={inputConfig.placeholder}
          value={inputConfig.value}
          onChange={inputConfig.onChange}
        />
        {inputConfig.hasError && (
          <ErrorText errorMessage={inputConfig.errorMessage} />
        )}
      </Form.Item>
    );
  }
}
