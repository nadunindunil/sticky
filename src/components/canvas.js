import React, { Component } from 'react';
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
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
    
    if (this.props.canvasData) {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.canvasData))
      );
      editorState = EditorState.moveFocusToEnd(editorState);
    } else {
      editorState = EditorState.createEmpty();
      editorState = EditorState.moveFocusToEnd(editorState);
    }
    this.state = { editorState: editorState };

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
    // console.log(editorState);
    this.props.canvasActions.changeCanvasData(
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
