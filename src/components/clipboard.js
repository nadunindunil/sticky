import React, { Component } from "react";
import PropTypes from "prop-types";

const electron = window.require("electron");
const clipboard = window.require("electron-clipboard-extended");

export default class _Clipboard extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      Value: electron.clipboard.readText()
    };
  }

  componentDidMount() {
    clipboard
      .on("text-changed", () => {
        let currentText = electron.clipboard.readText();
        this.setState({ Value: currentText });
      })
      .startWatching();
  }

  componentWillUnmount() {
    clipboard.stopWatching();
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h5 className="my-0 mr-md-auto font-weight-normal">Clipboard</h5>
        </div>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">{this.state.Value}</div>
          </div>
        </div>
      </div>
    );
  }
}
