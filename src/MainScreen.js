import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import CardList from "./components/CardList";
import CheckBox from "./components/CheckBox";
import RadioButton from "./components/RadioButton";
import { debounce } from "lodash";

class MainScreen extends React.PureComponent {
  state = {
    items: [],
    searchText: "",
    searchBy: "name",// name or friends
    isAgeFilterDisabled: true,
    ageFilter: {
      operator: "", //LESS THAN, IS, MORE THAN
      value: ""
    }
  };

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, items: this.props.data });
  }
  componentWillReceiveProps(props) {
    this.setState({ ...this.state, items: props.data });
  }
  componentWillUnmount(){
    this.debounceEvent.cancel();
  }
  render() {
    console.log(this.state.searchBy);
    if (this.props.appState === "LOADING") return <LoadingScreen />;
    else {
      return (
        <div className="row">
          <div className="col-lg-12 text-center">
            <input
              id="search"
              type="text"
              placeholder="Search"
              // onChange={this.debounceEvent(this.handleSearch, 100)}
              onChange={this.handleSearch}
            />
            <RadioButton
              type="radio"
              name="searchBy"
              label="Name"
              value="name"
              // onChange={this.debounceEvent(this.handleSearchBy, 200)}
              onChange={this.handleSearchBy}
            />
            <RadioButton
              type="radio"
              name="searchBy"
              label="Friends"
              value="friends"
              // onChange={this.debounceEvent(this.handleSearchBy, 200)}
              onChange={this.handleSearchBy}
            />
            <div>
              <div className="Age">
                <CheckBox label="Age" onChange={this.handleCBAge} />
                <RadioButton
                  disabled={this.state.isAgeFilterDisabled}
                  type="radio"
                  name="age"
                  value="Less than"
                  label="Less than"
                  onChange={this.handleAgeChange}
                />
                <RadioButton
                  disabled={this.state.isAgeFilterDisabled}
                  type="radio"
                  name="age"
                  value="Is"
                  label="Is"
                  onChange={this.handleAgeChange}
                />
                <RadioButton
                  disabled={this.state.isAgeFilterDisabled}
                  type="radio"
                  name="age"
                  value="More than"
                  label="More than"
                  onChange={this.handleAgeChange}
                />
                <input
                  disabled={this.state.isAgeFilterDisabled}
                  type="number"
                  value={this.ageFilterValue}
                  onChange={this.handleAgeChange}
                />
                <button onClick={this.filterItems}>Filter</button>
              </div>
            </div>
          </div>
          <CardList items={this.state.items} />
        </div>
      );
    }
  }

  // handleSearch = debounce((event)=>{
  //   event.persist();
  //   console.log("HANDLE SEARCH");
  //   console.log(event.target);
  //   this.setState({ ...this.state, searchText: event.target.value });
  //   this.filterItems();
  // }, 100);

  // handleSearchBy = debounce((event)=>{
  //   event.persist();
  //   console.log("HANDLE SEARCH BY");
  //   console.log(event.target);
  //   this.setState({...this.state, searchBy: event.target.value})
  //   this.filterItems();
  // },100);

  handleSearch = this.debounceEvent((event)=>{
    console.log("HANDLE SEARCH");
    console.log(event.target);
    this.setState({ ...this.state, searchText: event.target.value });
    this.filterItems();
  }, 100);

  handleSearchBy = this.debounceEvent((event)=>{
    console.log("HANDLE SEARCH BY");
    console.log(event.target);
    this.setState({...this.state, searchBy: event.target.value})
    this.filterItems();
  },100);

  handleCBAge = () => {
    this.setState({
      ...this.state,
      isAgeFilterDisabled: !this.state.isAgeFilterDisabled
    });
  };
  handleAgeChange = event => {
    if (event.target.type === "number") {// Change VALUE
      this.setState({
        ...this.state,
        ageFilter: { ...this.state.ageFilter, value: event.target.value }
      });
    } else {//Change OPERATOR
      this.setState({
        ...this.state,
        ageFilter: { ...this.state.ageFilter, operator: event.target.value }
      });
    }
  };

  filterItems = () => {
    const { searchText, ageFilter, searchBy } = this.state;
    let items = this.props.data;
    if (searchText.length > 0) {
      if(searchBy == "name"){
        items = items.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }else if(searchBy == "friends"){
        items = items.filter(item =>{ 
            let hasFriend = false;
            for(let i = 0; i < item.friends.length; i ++){
              if(item.friends[i].toLowerCase().includes(searchText.toLowerCase())){
                hasFriend = true;
                break;
              }
            }
            return hasFriend;
          }
        );
      }
      
    }
    if (!this.state.isAgeFilterDisabled) {
      items = items.filter(item => {
        if (ageFilter.operator === "Less than") {
          return item.age < ageFilter.value;
        }
        if (ageFilter.operator === "Is") {
          return item.age == ageFilter.value;
        }
        if (ageFilter.operator === "More than") {
          return item.age > ageFilter.value;
        }
      });
    }
    this.setState({...this.state, items });
  };
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
    data: state.data
  };
};

export default connect(mapStateToProps)(MainScreen);
