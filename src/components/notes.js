import React, { Component } from "react";
import NotesList from "./notesList";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import Canvas from "./canvas"

export default class Notes extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      isEditing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    let editState = !this.state.isEditing;
    this.setState({ isEditing: editState });
  }

  render() {
    const noteView = this.state.isEditing ? <Canvas /> : <NotesList/>;
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h6 className="my-0 mr-md-auto font-weight-normal">Notes</h6>
          <button
            className="btn btn-outline-secondary btn-circle "
            onClick={this.toggleEdit}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {noteView}
      </div>
    );
  }
}
