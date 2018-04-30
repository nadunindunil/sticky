import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  EditorState,
  convertFromRaw
} from 'draft-js';

import * as _canvasActions from '../actions/canvasActions';
import * as _editStateActions from '../actions/editStateActions';
import * as _notesActions from '../actions/notesActions';

class Note extends Component {
  constructor(props, contect) {
    super(props);

    let editorState;

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

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.note){
      let editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(nextProps.note.data))
      );
      return{editorState: editorState};
    }
    else {
      return null;
    }
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  clickOnNote(event) {
    this.props.canvasActions.addCanvasData(this.props.note);
    this.props.editStateActions.changeState('edit');
    this.props.searchFalse();
    event.preventDefault();
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
          <div className="reduce-padding card-body grey-background">
            {this.state.isMouseInside ? (
              <FontAwesomeIcon
                className="float-right pointer"
                icon={faCircle}
                onClick={this.clickOnDelete}
              />
            ) : null}
            {this.state.editorState.getCurrentContent().getPlainText()}
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
