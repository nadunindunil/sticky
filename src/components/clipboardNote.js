import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import faCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';

import * as _notesActions from '../actions/notesActions';

class ClipboardNote extends Component {
  constructor(props, contect) {
    super(props);

    let editorState;

    console.log(this.props.content);

    if (this.props.content.trim() !== '') {
      const processedHTML = DraftPasteProcessor.processHTML(this.props.content);
      const contentState = ContentState.createFromBlockArray(processedHTML);
      //move focus to the end.
      editorState = EditorState.createWithContent(contentState);
      editorState = EditorState.moveFocusToEnd(editorState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      editorState: editorState
    };

    this.clickOnAddToData = this.clickOnAddToData.bind(this);
  }

  clickOnAddToData(event) {
    this.props.notesActions.insertNote(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
    event.stopPropagation();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.content) {
      if (nextProps.content.trim() !== '') {
        let editorState;

        const processedHTML = DraftPasteProcessor.processHTML(nextProps.content);
        const contentState = ContentState.createFromBlockArray(processedHTML);
        //move focus to the end.
        editorState = EditorState.createWithContent(contentState);
        editorState = EditorState.moveFocusToEnd(editorState);
        return { editorState: editorState };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="padding-low">
        <div className="card">
          <div className="reduce-padding card-body">
            <FontAwesomeIcon className="float-right pointer" icon={faCircle} onClick={this.clickOnAddToData} />
            <div className="card-body">{this.state.editorState.getCurrentContent().getPlainText()}</div>
          </div>
        </div>
      </div>
    );
  }
}

ClipboardNote.propTypes = {
  notesActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return { notes: state.notes, canvasData: state.canvasData };
}

function mapDispatchToProps(dispatch) {
  return {
    notesActions: bindActionCreators(_notesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardNote);
