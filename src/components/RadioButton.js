import React, { Component } from "react";

class RadioButton extends Component {
  state = {
    isChecked: false
  };

  toggleRadioChange = (event) => {
    this.props.onChange(event);
  };

  render() {
    const { label, value, checked, name, disabled } = this.props;

    return (
      <div className="radio">
        <label>
          <input
            checked={checked}
            type="radio"
            disabled={disabled}
            name={name}
            label={label}
            value={value}
            onChange={this.toggleRadioChange}
          />
          {label}
        </label>
      </div>
    );
  }
}

export default RadioButton;
