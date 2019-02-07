import React from "react";
import PropTypes from "prop-types";
import ErrorText from "./ErrorText";
import { Form, Input } from "antd";

export default class InputField extends React.Component {
  static propTypes = {
    // Required
    id: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    // Optional
    label: PropTypes.string,
    getPrefix: PropTypes.func,
    type: PropTypes.string
  };

  static defaultProps = {
    hasError: false
  };

  getPrefix() {
    const { getPrefix } = this.props;
    if (typeof getPrefix === "function") {
      return getPrefix();
    }
    return null;
  }

  getInputClassNames() {
    if (this.props.hasError) {
      return "has-error";
    }
  }

  render() {
    const { id, label, placeholder, value, onChange, hasError } = this.props;
    return (
      <Form.Item className="custom-input-field" label={label}>
        <Input
          autoComplete="off"
          id={id}
          type={this.props.type ? this.props.type : "text"}
          name={id}
          className={this.getInputClassNames()}
          prefix={this.getPrefix()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {hasError && <ErrorText errorMessage={this.props.errorMessage} />}
      </Form.Item>
    );
  }
}
