import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import CardList from "./components/CardList";
import { debounce } from "lodash";

import FilterAge from "./components/FilterAge"
import FilterProfessions from "./components/FilterProfessions"

//Style imports
import { Layout, Input, Radio } from 'antd';
const { Header, Content } = Layout;

class MainScreen extends React.PureComponent {
  state = {
    rowCount: 4,
    isSearchByNameChecked: true,
    searchPlaceholder: "Search by name"
  };

  render() {
    if (this.props.appState === "LOADING") return <LoadingScreen />;
    else {
      const Search = Input.Search;
      return (
        <Layout>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className="text-center">
                <Search
                  placeholder={this.state.searchPlaceholder}
                  onChange={this.handleSearch}
                  style={{ width: 200 }}
                />
                <Radio.Group defaultValue="name" buttonStyle="solid">
                  <Radio.Button onChange={this.handleSearchBy} value="name">Name</Radio.Button>
                  <Radio.Button onChange={this.handleSearchBy} value="friends">Friends</Radio.Button>
                </Radio.Group>
              </div>
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff'
            }}
            >
            <FilterAge/>
              <FilterProfessions/>
                <CardList items={this.props.filteredItems} rowCount={this.state.rowCount} />
            </Content>
          </Layout>
        </Layout>
      );
    }
  }

  handleSearch = (event) => {
    this.runDebounced(this.props.setSearchText, event.target.value);
  }

  handleSearchBy = (event) => {
    this.setState({searchPlaceholder: "Search by "+event.target.value});
    this.runDebounced(this.props.setSearchBy, event.target.value);
  };

  runDebounced = debounce((callback, params) => {
    callback(params);
  }, 500);
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchText: (data) => {
      dispatch({
        type: "SET_SEARCH_TEXT",
        payload: data
      });
    },
    setSearchBy: (data) => {
      dispatch({
        type: "SET_SEARCH_BY",
        payload: data
      })
    }
  }
}

const mapStateToProps = state => {
  return {
    isReady: state.isReady,
    appState: state.appState,
    filteredItems: state.filteredItems,
    isFilterAgeDisabled: state.isFilterAgeDisabled,
    isFilterProfessionsDisabled: state.isFilterProfessionsDisabled,
    filterProfessions: state.filterProfessions,
    filterAge: state.filterAge
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
