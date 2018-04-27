import React, { Component } from 'react';
import Note from './note';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes
    };
  }

  render() {
    console.log(this.props.notes);
    return (
      <div>
        {this.state.notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    );
  }
}

export default NotesList;
