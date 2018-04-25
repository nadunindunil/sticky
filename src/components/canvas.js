import React, { Component } from "react";
import { ContentState, Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    let editorState;
    if (this.props.textData.trim() !== "") {
      const processedHTML = DraftPasteProcessor.processHTML(this.props.textData);
      const contentState = ContentState.createFromBlockArray(processedHTML);
      //move focus to the end.
      editorState = EditorState.createWithContent(contentState);
      editorState = EditorState.moveFocusToEnd(editorState);
    } else {
      editorState = EditorState.createEmpty();
    }
    this.state = { editorState: editorState };
    this.onChange = editorState => this.setState({ editorState });
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
