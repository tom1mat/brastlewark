import React from 'react';
import { connect } from "react-redux";
import { debounce } from "lodash"
import { Checkbox, Switch, Col } from 'antd';

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
                <div className="center-block"><Switch onChange={this.handleToggleProfessions} /> Professions</div>
                {Object.values(this.props.professions).map((eachProff, index) => {
                    return <Col lg={6}
                                md={8}
                                sm={12}
                                xs={24}
                                key={index}>
                                    <Checkbox disabled={this.state.isDisabled} onChange={this.handleProfessionChange} value={eachProff.profession}>
                                        {eachProff.profession + "(" + eachProff.workersCount + ")"}
                                    </Checkbox>
                                </Col>
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
