import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Clipboard extends Component {
  //   static propTypes = {
  //     prop: PropTypes
  //   }

  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h5 className="my-0 mr-md-auto font-weight-normal">Clipboard</h5>
        </div>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
