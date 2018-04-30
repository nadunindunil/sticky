import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as _canvasActions from '../actions/canvasActions';

class Canvas extends Component {
  constructor(props) {
    super(props);
    let editorState;
    
    if (this.props.canvasData.data) {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.canvasData.data))
      );
      editorState = EditorState.moveFocusToEnd(editorState);
    } else {
      editorState = EditorState.createEmpty();
      editorState = EditorState.moveFocusToEnd(editorState);
    }
    this.state = { editorState: editorState };
    
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onChange(editorState) {
    this.setState({ editorState });
    this.props.canvasActions.changeCanvasData({ _id:this.props.canvasData._id,data:
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  });
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
            />
          </div>
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  canvasActions: PropTypes.object.isRequired,
  canvasData: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return { canvasData: state.canvasData };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(_canvasActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
