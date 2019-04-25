import React from 'react';
import { connect } from "react-redux";
import { debounce } from "lodash"
import { Checkbox, Switch } from 'antd';

class FilterProfessions extends React.PureComponent {
    state = {
        isDisabled: true
    }

    handleToggleProfessions = value => {
        this.setState({ isDisabled: !value });
        this.runDebounced(this.props.toggleFilter, !value);
    };

    handleProfessionChange = event => {
        //const professions = this.props.professions;
        const profession = event.target.value;
        if (event.target.checked) {
            //professions.push(thisProfession);
            this.runDebounced(this.props.setFilterProfessions, { operation: "ADD", profession });
        } else {
            this.runDebounced(this.props.setFilterProfessions, { operation: "REMOVE", profession });
        }
    };

    runDebounced = debounce((callback, param) => {
        callback(param);
    }, 500);

    render() {
        return (
            <div className="filterProfessions">
                <Switch onChange={this.handleToggleProfessions} /> Professions
                {Object.values(this.props.professions).map((eachProff) => {
                    return <Checkbox disabled={this.state.isDisabled} onChange={this.handleProfessionChange} value={eachProff.profession}>
                        {eachProff.profession + "(" + eachProff.workersCount + ")"}
                    </Checkbox>
                })}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilterProfessions: (data) => {
            dispatch({
                type: "SET_FILTER_PROFESSION",
                payload: data
            });
        },
        toggleFilter: (data) => {
            dispatch({
                type: "TOGGLE_FILTER",
                payload: { filter: "PROFESSIONS", data }
            })
        }
    };
};

const mapStateToProps = state => {
    return {
        professions: state.professions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProfessions);
