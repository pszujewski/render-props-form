import React from "react";
import PropTypes from "prop-types";
import ErrorText from "./ErrorText";
import { Form, Input } from "antd";
import * as types from "./actionTypes";

export default class InputField extends React.Component {
  static propTypes = {
    // Required
    id: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    update: PropTypes.func.isRequired,
    // Optional
    label: PropTypes.string,
    getPrefix: PropTypes.func,
    type: PropTypes.string
  };

  static defaultProps = {
    hasError: false
  };

  render() {
    const { id, label, placeholder, value, hasError } = this.props;
    return (
      <Form.Item className="custom-input-field" label={label}>
        <Input
          autoComplete="off"
          id={id}
          name={id}
          type={this.props.type ? this.props.type : "text"}
          onChange={this.handleOnChange}
          className={this.getInputClassNames()}
          prefix={this.getPrefix()}
          placeholder={placeholder}
          value={value}
        />
        {hasError && <ErrorText errorMessage={this.props.errorMessage} />}
      </Form.Item>
    );
  }

  handleOnChange = event => {
    const { update, id } = this.props;
    const nextValue = event.currentTarget.value;

    const inputOnChangeAction = {
      type: types.UPDATE_INPUT_FIELD,
      payload: { fieldName: id, nextValue },
    };

    update(inputOnChangeAction);
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
}
