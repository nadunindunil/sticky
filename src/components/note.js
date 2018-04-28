import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw
} from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

import * as _canvasActions from '../actions/canvasActions';
import * as _editStateActions from '../actions/editStateActions';
import * as _notesActions from '../actions/notesActions';

class Note extends Component {
  constructor(props, contect) {
    super(props);

    let editorState;
    console.log(this.props.note.data);

    editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(this.props.note.data))
    );

    this.state = {
      isMouseInside: false,
      editorState: editorState
    };

    this.clickOnNote = this.clickOnNote.bind(this);
    this.clickOnDelete = this.clickOnDelete.bind(this);
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  clickOnNote() {
    this.props.canvasActions.addCanvasData(this.props.note);
    this.props.editStateActions.changeState('edit');
  }

  clickOnDelete(event) {
    this.props.notesActions.deleteNote(this.props.note._id);
    event.stopPropagation();
  }

  render() {
    return (
      <div className="padding-low">
        <div
          className="card"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={this.clickOnNote}
        >
          <div className="card-body grey-background">
            {this.state.isMouseInside ? (
              <FontAwesomeIcon
                className="float-right pointer"
                icon={faCircle}
                onClick={this.clickOnDelete}
              />
            ) : null}
            <Editor editorState={this.state.editorState} />
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  canvasActions: PropTypes.object.isRequired,
  editStateActions: PropTypes.object.isRequired,
  notesActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return { notes: state.notes, canvasData: state.canvasData };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(_canvasActions, dispatch),
    editStateActions: bindActionCreators(_editStateActions, dispatch),
    notesActions: bindActionCreators(_notesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
