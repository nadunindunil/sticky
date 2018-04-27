import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCircle from "@fortawesome/fontawesome-free-solid/faMinusCircle";
import faWindowClose from "@fortawesome/fontawesome-free-solid/faWindowClose";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as _canvasActions from '../actions/canvasActions';
import * as _editStateActions from '../actions/editStateActions';


class Note extends Component {
  constructor(props, contect) {
    super(props);
    this.state = {
      isMouseInside: false
    };

    this.clickOnNote = this.clickOnNote.bind(this);
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  clickOnNote(){
    this.props.canvasActions.addCanvasData(this.props.note);
    this.props.editStateActions.changeState('edit');
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
              />
            ) : null}

            {this.props.note.data}
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  canvasActions: PropTypes.object.isRequired,
  editStateActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return { notes: state.notes, canvasData: state.canvasData };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(_canvasActions, dispatch),
    editStateActions: bindActionCreators(_editStateActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);

