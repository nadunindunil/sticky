import React, { Component } from "react";
import NotesList from "./notesList";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faSave from "@fortawesome/fontawesome-free-solid/faSave";
import Canvas from "./canvas";

export default class Notes extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      isEditing: "idle",
      textData: ""
    };

    this.toggleToEdit = this.toggleToEdit.bind(this);
    this.toggleToIdle = this.toggleToIdle.bind(this);
    this.toggleToNew = this.toggleToNew.bind(this);
    this.showEditCanvas = this.showEditCanvas.bind(this);
  }

  toggleToIdle() {
    let editState = "idle";
    this.setState({ isEditing: editState });
  }

  toggleToEdit() {
    let editState = "edit";
    this.setState({ isEditing: editState });
  }

  toggleToNew() {
    let editState = "new";
    this.setState({ isEditing: editState });
  }

  showEditCanvas(textData) {
    this.setState({ textData: textData }, function() {
      let editState = "edit";
      this.setState({ isEditing: editState });
    });
  }

  render() {
    const buttonRender = state => {
      switch (state) {
        case "new":
          return (
            <button
              className="btn btn-outline-secondary btn-circle "
              onClick={this.toggleToIdle}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          );
        case "edit":
          return (
            <button
              className="btn btn-outline-secondary btn-circle "
              onClick={this.toggleToIdle}
            >
              <FontAwesomeIcon icon={faSave} />
              edit
            </button>
          );
        case "idle":
          return (
            <button
              className="btn btn-outline-secondary btn-circle "
              onClick={this.toggleToNew}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          );
        default:
          return null;
      }
    };

    const listRender = (text, state) => {
      switch (state) {
        case "new":
          return <Canvas />;
        case "edit":
          return <Canvas textData={this.state.textData} />;
        case "idle":
          return <NotesList showEditCanvas={this.showEditCanvas} />;
        default:
          return null;
      }
    };

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h6 className="my-0 mr-md-auto font-weight-normal">Notes</h6>
          {buttonRender(this.state.isEditing)}
        </div>
        {listRender(this.state.textData, this.state.isEditing)}
      </div>
    );
  }
}
