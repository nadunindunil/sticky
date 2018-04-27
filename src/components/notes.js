import React, { Component } from 'react';
import NotesList from './notesList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Canvas from './canvas';

import * as _notesActions from '../actions/notesActions';
import * as _editStateActions from '../actions/editStateActions';
import * as _canvasActions from '../actions/canvasActions';


class Notes extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      textData: '',
      editingId: '',
      notes: this.props.notes,
      editState: this.props.editState
    };

    this.toggleToEdit = this.toggleToEdit.bind(this);
    this.toggleToIdle = this.toggleToIdle.bind(this);
    this.toggleToNew = this.toggleToNew.bind(this);
    this.showEditCanvas = this.showEditCanvas.bind(this);
  }

  toggleToIdle() {
    let editState = 'idle';
    if (this.props.editState == 'edit') {
      this.props.noteActions.editNote({
        id: this.props.canvasData.id,
        data: this.props.canvasData.data
      });
    }
    else if (this.props.editState == 'new'){
      this.props.noteActions.insertNote({
        id: this.props.canvasData.id,
        data: this.props.canvasData.data
      });
    }
    this.props.editStateActions.changeState(editState);
  }

  toggleToEdit() {
    let editState = 'edit';
    this.props.editStateActions.changeState(editState);
  }

  toggleToNew() {
    let editState = 'new';
    this.props.editStateActions.changeState(editState);
    this.props.canvasActions.addCanvasData({id:this.props.notes.length+1, data: ""});
  }

  showEditCanvas(data) {
    console.log(data);
    let editState = 'edit';
    this.props.editStateActions.changeState(editState);
  }

  render() {
    const buttonRender = state => {
      switch (state) {
        case 'new':
          return (
            <button
              className="btn btn-outline-secondary btn-circle "
              onClick={this.toggleToIdle}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          );
        case 'edit':
          return (
            <button
              className="btn btn-outline-secondary btn-circle "
              onClick={this.toggleToIdle}
            >
              <FontAwesomeIcon icon={faSave} />
              edit
            </button>
          );
        case 'idle':
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
        case 'new':
          return <Canvas />;
        case 'edit':
          return <Canvas />;
        case 'idle':
          return (
            <NotesList
              notes={this.state.notes}
              showEditCanvas={this.showEditCanvas}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h6 className="my-0 mr-md-auto font-weight-normal">Notes</h6>
          {buttonRender(this.props.editState)}
        </div>
        {listRender(this.state.textData, this.props.editState)}
      </div>
    );
  }
}

NotesList.propTypes = {
  noteActions: PropTypes.object.isRequired,
  editStateActions: PropTypes.object.isRequired,
  notes: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return { notes: state.notes, editState: state.editState, canvasData: state.canvasData };
}

function mapDispatchToProps(dispatch) {
  return {
    noteActions: bindActionCreators(_notesActions, dispatch),
    editStateActions: bindActionCreators(_editStateActions, dispatch),
    canvasActions: bindActionCreators(_canvasActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
