import React, { Component } from "react";
import Notes from "./components/notes";
import Clipboard from "./components/clipboard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        
        <div className="row">
          <div className="col-sm">
            <Clipboard/>
          </div>
          <div className="col-sm">
            <Notes/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
