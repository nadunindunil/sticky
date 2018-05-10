import React, { Component } from 'react';
import Note from './note';

class NotesList extends Component {
  render() {
    return (
      <div className="scroller" id="style-1">
        {this.props.notes.map(note => <Note key={note._id} note={note} searchFalse={this.props.searchFalse} />)}
      </div>
    );
  }
}

export default NotesList;
