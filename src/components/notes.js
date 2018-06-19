import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';
import faClose from '@fortawesome/fontawesome-free-solid/faTimes';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Canvas from './canvas';
import NotesList from './notesList';

import * as _notesActions from '../actions/notesActions';
import * as _editStateActions from '../actions/editStateActions';
import * as _canvasActions from '../actions/canvasActions';

class Notes extends Component {
  constructor(props, contect) {
    super(props);
    this.props.noteActions.getNotes();
    this.state = {
      editingId: '',
      editState: this.props.editState,
      notes: this.props.notes,
      isSearching: false,
      searched: []
    };

    this.toggleToEdit = this.toggleToEdit.bind(this);
    this.toggleToIdle = this.toggleToIdle.bind(this);
    this.toggleToNew = this.toggleToNew.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toggleSearching = this.toggleSearching.bind(this);
    this.setSearchFalse = this.setSearchFalse.bind(this);
    this.search = this.search.bind(this);

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.notes !== nextProps.notes) {
      return { notes: nextProps.notes };
    } else {
      return null;
    }
  }

  toggleToIdle() {
    let editState = 'idle';
    if (this.props.editState === 'edit') {
      this.props.noteActions.editNote(
        this.props.canvasData._id,
        this.props.canvasData.data
      );
    } else if (this.props.editState === 'new') {
      this.props.noteActions.insertNote(this.props.canvasData.data);
    }
    this.props.editStateActions.changeState(editState);
  }

  cancel() {
    let editState = 'idle';
    this.props.editStateActions.changeState(editState);
  }

  toggleToEdit() {
    let editState = 'edit';
    this.props.editStateActions.changeState(editState);
  }

  toggleToNew() {
    let editState = 'new';
    this.setState({ isSearching: false });
    this.props.editStateActions.changeState(editState);
    this.props.canvasActions.addCanvasData({
      data: ''
    });
  }

  toggleSearching() {
    let isSearching = !this.state.isSearching;
    this.setState({ isSearching: isSearching });
  }

  setSearchFalse(){
    this.setState({ isSearching: false });
  }

  search(event){
    // TODO: need to convert plain text since the data is strigified json
    let updatedList = this.state.notes;
    let updated = updatedList.filter(function(item){
      return item.data.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({searched: updated});
  }

  render() {
    const buttonRender = state => {
      switch (state) {
        case 'new':
          return (
            <div>
              <button
                className="btn btn-outline-secondary btn-circle "
                onClick={this.toggleToIdle}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-outline-danger btn-circle "
                onClick={this.cancel}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          );
        case 'edit':
          return (
            <div>
              <button
                className="btn btn-outline-secondary btn-circle"
                onClick={this.toggleToIdle}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-outline-danger btn-circle "
                onClick={this.cancel}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          );
        case 'idle':
          return (
            <div>
              <button
                className="btn btn-outline-secondary btn-circle "
                onClick={this.toggleToNew}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="btn btn-outline-info btn-circle "
                onClick={this.toggleSearching}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          );
        default:
          return null;
      }
    };

    const listRender = (state,isSearching) => {
      switch (state) {
        case 'new':
          return <Canvas />;
        case 'edit':
          return <Canvas />;
        case 'idle':
          return <div>{this.state.isSearching ? <NotesList notes={this.state.searched} searchFalse={this.setSearchFalse}/> : <NotesList notes={this.state.notes} searchFalse={this.setSearchFalse}/>}
          </div>;
        default:
          return null;
      }
    };

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow low-height">
          <div className="col-sm-9 col-md-9 col-xl-10">
            {this.state.isSearching ? (
              <input className="form-control form-control-sm small-height" placeholder="Search" onChange={this.search} autoFocus/>
            ) : (
              <h6 className="my-0 mr-md-auto font-weight-normal">Notes</h6>
            )}
          </div>
          <div className="col-sm-3 col-md-3 col-xl-2">
            <div className="float-right">
              {buttonRender(this.props.editState)}
            </div>
          </div>
        </div>
        {listRender(this.props.editState)}
      </div>
    );
  }
}

Notes.propTypes = {
  noteActions: PropTypes.object.isRequired,
  editStateActions: PropTypes.object.isRequired,
  notes: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    editState: state.editState,
    canvasData: state.canvasData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    noteActions: bindActionCreators(_notesActions, dispatch),
    editStateActions: bindActionCreators(_editStateActions, dispatch),
    canvasActions: bindActionCreators(_canvasActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
