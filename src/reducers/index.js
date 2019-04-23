const reducer = (state = { appState: "LOADING" }, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      state = {
        ...state,
        data: action.payload
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
  }
  return state;
};

export default reducer;
