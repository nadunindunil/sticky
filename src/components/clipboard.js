import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClipboardNote from './clipboardNote';

import * as _canvasActions from '../actions/canvasActions';
import * as _editStateActions from '../actions/editStateActions';
import * as _notesActions from '../actions/notesActions';

const electron = window.require('electron');
const clipboard = window.require('electron-clipboard-extended');

class AppClipboard extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      Value: electron.clipboard.readText(),
      clipboardArray: []
    };

    this.clickOnAddToData = this.clickOnAddToData.bind(this);
  }

  componentDidMount() {
    clipboard
      .on('text-changed', () => {
        let currentText = electron.clipboard.readText();
        let newClipboardArray = this.state.clipboardArray;

        newClipboardArray.push(currentText);
        if (newClipboardArray.length > 4) {
          newClipboardArray.shift();
        }
        this.setState({ clipboardArray: newClipboardArray });
        this.setState({ Value: currentText });
      })
      .startWatching();
  }

  componentWillUnmount() {
    clipboard.stopWatching();
  }

  clickOnAddToData(value) {
    // this.props.notesActions.insertNote(value);
    // event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <h6 className="my-0 mr-md-auto font-weight-normal">Clipboard</h6>
        </div>
        <div className="container-fluid">
          <div className="scroller" id="style-1">
            {this.state.clipboardArray
              .slice(0)
              .reverse()
              .map((content, index) => <ClipboardNote content={content} key={index} />)}
          </div>
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AppClipboard);
