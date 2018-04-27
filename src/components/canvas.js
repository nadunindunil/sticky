import React, { Component } from 'react';
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw
} from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as _canvasActions from '../actions/canvasActions';


class Canvas extends Component {
  constructor(props) {
    super(props);
    let editorState;
    console.log(this.props.canvasData);
    if (this.props.canvasData && this.props.canvasData.trim() !== '') {
      const processedHTML = DraftPasteProcessor.processHTML(
        this.props.canvasData
      );
      const contentState = ContentState.createFromBlockArray(processedHTML);
      //move focus to the end.
      editorState = EditorState.createWithContent(contentState);
      editorState = EditorState.moveFocusToEnd(editorState);
    } else {
      editorState = EditorState.createEmpty();
    }
    this.state = { editorState: editorState };
    this.onChange = editorState => {
      this.setState({ editorState });
      // console.log(editorState);
      this.props.canvasActions.changeCanvasData(editorState.getCurrentContent().getPlainText());
    };
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { canvasData: state.canvasData.data };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(_canvasActions, dispatch)
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Canvas);
