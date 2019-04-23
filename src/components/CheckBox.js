import React, { Component } from "react";

class Checkbox extends Component {
  state = {
    isChecked: false
  };

  toggleCheckboxChange = (event) => {
    const { onChange } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    onChange(event);
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
