import React from 'react';
import { connect } from "react-redux";
import { debounce } from "lodash"

import { Switch, Radio, Input } from "antd";
class FilterAge extends React.PureComponent {
    state = {
        isDisabled: true
    }

    handleToggleAge = (value) => {
        this.setState({ isDisabled: !value })
        this.runDebounced(this.props.toggleFilter, !value);
    };

    handleAgeValue = event => {
        this.runDebounced(this.props.setFilterAge, { value: event.target.value });
    };

    handleAgeOperation = event => {
        this.runDebounced(this.props.setFilterAge, { operation: event.target.value });
    }

    runDebounced = debounce((callback, param) => {
        callback(param);
    }, 500);

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div>
                <Switch onChange={this.handleToggleAge} /> Age
                    <Radio.Group defaultValue="Less than" onChange={this.handleAgeOperation} disabled={this.state.isDisabled}>
                    <Radio style={radioStyle} value="Less than">Less than</Radio>
                    <Radio style={radioStyle} value="Is">Is</Radio>
                    <Radio style={radioStyle} value="More than">More than</Radio>
                </Radio.Group>
                <Input
                    disabled={this.state.isDisabled}
                    type="number"
                    onChange={this.handleAgeValue}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilterAge: (data) => {
            dispatch({
                type: "SET_FILTER_AGE",
                payload: data
            });
        },
        toggleFilter: (data) => {
            dispatch({
                type: "TOGGLE_FILTER",
                payload: { filter: "AGE", data }
            })
        }
    };
};

export default connect(null, mapDispatchToProps)(FilterAge);
