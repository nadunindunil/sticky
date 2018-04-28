import React, { Component } from 'react';
import Note from './note';

class NotesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.notes);
    return (
      <div>
        {this.props.notes.map(note => (
          <Note key={note._id} note={note} />
        ))}
      </div>
    );
  }
}

export default NotesList;
