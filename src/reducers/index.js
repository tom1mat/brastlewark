const reducer = (state = {isReady: false}, action) => {
    switch(action.type){
      case "LOAD_DATA":
        state = {
          ...state,
          data: action.payload
        }
      break;
      case "SET_ISREADY":
        state = {
          ...state,
          isReady: true
        }
        break;
    }
    return state;
}

export default reducer;