import React, { Component } from "react";
import Note from "./note";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

export default class Notes extends Component {
  //   static propTypes = {
  //     prop: PropTypes
  //   };

  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h5 className="my-0 mr-md-auto font-weight-normal">Notes</h5>
          <button className="btn btn-outline-secondary btn-circle "><FontAwesomeIcon icon={faPlus} /></button>
          
        </div>
        <div className="container-fluid">
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    );
  }
}
