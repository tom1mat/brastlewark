import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import CardList from "./components/CardList";
import { debounce } from "lodash";

import FilterAge from "./components/FilterAge"
import FilterProfessions from "./components/FilterProfessions"

//Style imports
import { Layout, Input, Radio, Pagination, Col, Row, Button } from 'antd';
const { Header, Content } = Layout;

class MainScreen extends React.PureComponent {
  state = {
    rowCount: 4,
    isSearchByNameChecked: true,
    searchPlaceholder: "Search by name",
    paginatedItems: [],
    showFilters: false,
    centeredClass: '',
    pageSelected: 1,
    isGoTopDisabled: true
  };

  componentWillReceiveProps(props) {
    if (props.filteredItems) {
      this.setState({ paginatedItems: this.paginate(props.filteredItems, 100, 1) })
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", event => {
      if (event.ctrlKey && event.keyCode == 32) {
        if (this.state.centeredClass === "centered") {
          this.setState({ centeredClass: "" });
        } else {
          this.setState({ centeredClass: "centered" });
          this.state.searchRef.focus();
        }
      }

      if (event.keyCode === 27) {
        this.setState({ centeredClass: "" });
      }
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown');
  }
  render() {

    if (this.props.appState === "LOADING") return <LoadingScreen />;
    else {
      const Search = Input.Search;

      return (
        <Layout>
          <Layout>
            <Header style={{ background: '#fff', paddingBottom: 17, height: "auto" }}>
              <Row>
                <Col xl={2} lg={2} sm={2} style={{ textAlign: "left", paddingLeft: 25 }}>
                  <Button onClick={this.handleFilters} type="primary" shape="circle" icon="menu-unfold" size="large" />
                </Col>
                <Col xl={20} lg={20} sm={20} style={{ textAlign: "center" }} className={this.state.centeredClass}>
                  <Search
                    ref={ref => this.setState({ searchRef: ref })}
                    placeholder={this.state.searchPlaceholder}
                    onChange={this.handleSearch}
                    style={{ width: 200 }}
                    size="large"
                  />
                  <Radio.Group defaultValue="name" buttonStyle="solid" size="large">
                    <Radio.Button onChange={this.handleSearchBy} value="name">Name</Radio.Button>
                    <Radio.Button onChange={this.handleSearchBy} value="friends">Friends</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col xl={24} lg={24} sm={24} style={{ textAlign: "center" }}>
                  <Pagination current={this.state.pageSelected} onChange={this.handlePagination} defaultPageSize={100} total={this.props.filteredItems.length} />
                </Col>
              </Row>
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff'
            }}
            >
              <Row gutter={15} className="filters" style={{ display: this.state.showFilters ? 'block' : 'none' }}>
                <h1 style={{ marginBottom: "5%" }}>Filters</h1>
                <Col sm={6} xs={24} className="filterCol">
                  <FilterAge />
                </Col>
                <Col sm={18} xs={24} className="filterCol">
                  <FilterProfessions />
                </Col>
              </Row>
              <CardList items={this.state.paginatedItems} rowCount={this.state.rowCount} />
              {!this.state.isGoTopDisabled ? <Button onClick={this.handleGoTop} type="primary" shape="circle" id="botGoUp" icon="caret-up" size="large" className="fixed" /> : null}
              <Col xl={24} lg={24} sm={24} style={{ textAlign: "center" }}>
                <Pagination current={this.state.pageSelected} onChange={this.handlePagination} defaultPageSize={100} total={this.props.filteredItems.length} />
              </Col>
            </Content>
          </Layout>
        </Layout>
      );
    }
  }

  handleScroll = () => {
    //Hide-show going top button
    const rect = this.state.searchRef.input.input.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    if ((elemTop >= 0) && (elemBottom <= window.innerHeight)) {
      this.setState({ isGoTopDisabled: true });
    } else {
      this.setState({ isGoTopDisabled: false });
    }
  }
  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  handleGoTop = () => {
    this.scrollToTop();
  }

  handleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters })
  }
  handlePagination = (page) => {
    this.setState({
      paginatedItems: this.paginate(this.props.filteredItems, 100, page),
      pageSelected: page
    });
  }

  paginate = (array, page_size, page_number) => {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }


  handleSearch = (event) => {
    this.runDebounced(this.props.setSearchText, event.target.value);
  }

  handleSearchBy = (event) => {
    this.setState({ searchPlaceholder: "Search by " + event.target.value });
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
