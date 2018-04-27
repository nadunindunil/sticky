import React, { Component } from 'react';
import Notes from './components/notes';
import AppClipboard from './components/clipboard';
import { Provider } from 'react-redux';

import configureStore from './store';
import initialState from './initialState';

import './App.css';

const store = configureStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <AppClipboard />
            </div>
            <div className="col-sm">
              <Notes />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
