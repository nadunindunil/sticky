import React, { Component } from "react";

export default class Note extends Component {
  render() {
    return (
      <div className="padding-low">
        <div className="card">
          <div className="card-body grey-background">This is some text within a card body.</div>
        </div>
      </div>
    );
  }
}
