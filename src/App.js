import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import MainScreen from './components/MainScreen';
import ProfileScreen from './components/ProfileScreen';
import { BrowserRouter, Route } from 'react-router-dom';

//const store = createStore(reducer, {}, applyMiddleware(thunk));
const store = createStore(reducer);
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          {console.log(store.getState().appState)}
          <BrowserRouter>
            <Route path="/" exact component={MainScreen}/>
            <Route path="/:user" component={ProfileScreen}/>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;