import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import MainScreen from './MainScreen';

//const store = createStore(reducer, {}, applyMiddleware(thunk));
const store = createStore(reducer);
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <MainScreen/>
        </Provider>
    );
  }
}

export default App;