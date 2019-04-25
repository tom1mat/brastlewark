/* eslint-disable default-case */
const initialState = {
  appState: "LOADING",
  items:[],
  filteredItems: [],
  professions:[],
  searchText: "",
  searchBy: "name",
  isFilterAgeDisabled: true,
  isFilterProfessionsDisabled: true,
  filterProfessions:[],
  filterAge:{
    operation: "More than",
    value: 0
  }
}

const reducer = (state = initialState, action) => {
  const filterItems = ()=>{
    console.log("FILTER!")
    let filteredItems = state.items;
    
    if (state.searchText.length > 0) {
      if(state.searchBy === "name"){
        filteredItems = filteredItems.filter(item =>
          item.name.toLowerCase().includes(state.searchText.toLowerCase())
        );
      }else if(state.searchBy === "friends"){
        filteredItems = filteredItems.filter(item =>{ 
            let hasFriend = false;
            for(let i = 0; i < item.friends.length; i ++){
              if(item.friends[i].toLowerCase().includes(state.searchText.toLowerCase())){
                hasFriend = true;
                break;
              }
            }
            return hasFriend;
          }
        );
      }
    }
    if (!state.isFilterAgeDisabled) {
      filteredItems = filteredItems.filter(item => {
        if (state.filterAge.operator === "Less than")
          return item.age < state.filterAge.value;
        else if(state.filterAge.operator === "Is") 
          return item.age == state.filterAge.value;
        else// More than
          return item.age > state.filterAge.value;
      })
    }
    
    if(!state.isFilterProfessionsDisabled && state.filterProfessions.length>0){
      for(let i = 0; i < state.filterProfessions.length; i++){
        filteredItems = filteredItems.filter(item=>{
            return item.professions.includes(state.filterProfessions[i]);
        })
      }
    }
    state = {...state, filteredItems };
  }
  switch (action.type) {
    case "LOAD_DATA":
      state = {
        ...state,
        filteredItems: action.payload,
        items: action.payload
      };
      break;
    case "LOAD_PROFESSIONS":
      state = {
        ...state,
        professions: action.payload
      };
      break;
    case "SET_APP_STATE":
      state = {
        ...state,
        appState: action.payload
      };
      break;
    case "SET_SEARCH_TEXT":
      state = {
        ...state,
        searchText: action.payload
      };
      filterItems();
      break;
    case "SET_SEARCH_BY":
      state = {
        ...state,
        searchBy: action.payload
      };
      filterItems();
      break;
    case "TOGGLE_FILTER":
      const filter = action.payload.filter
      if(filter === "AGE"){
        state = {
          ...state,
          isFilterAgeDisabled: action.payload.data
        }
      }else if(filter === "PROFESSIONS"){
        state = {
          ...state,
          isFilterProfessionsDisabled: action.payload.data
        }
      }
      filterItems();
    break;
    case "SET_FILTER_AGE":
      if(action.payload.operation != undefined){
        state = {
          ...state,
          filterAge: {...state.filterAge, operation: action.payload.operation}
        }
      }else if(action.payload.value!= undefined){
        state = {
          ...state,
          filterAge: {...state.filterAge, value: action.payload.value}
        }
      }
      filterItems();
    break;
    case "SET_FILTER_PROFESSION":
      const { operation, profession } = action.payload;
      const filterProfessions = state.filterProfessions;
      if(operation === "ADD"){
        filterProfessions.push(profession);
      }else if(operation === "REMOVE"){
        for(let i = 0; i < filterProfessions.length; i++){
          if(filterProfessions[i] === profession){
            filterProfessions.splice(i,1);
            break;
          }
        }
      }
      state = {
        ...state,
        filterProfessions
      }
      filterItems();
      break;
  }
  return state;
};

export default reducer;
