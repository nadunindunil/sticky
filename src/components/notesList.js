import React, { Component } from "react";
import Note from "./note";

export default class NotesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes : [{id:1, data: "data1"},{id:3, data: "data3"},{id:4, data: "data2"}]
    }

    this.clickOnNote = this.clickOnNote.bind(this);
  }

  clickOnNote(data){
    this.props.showEditCanvas(data);
    console.log(data);
  }

  render() {
    return (
      <div>
        {this.state.notes.map((note) =>
          <Note key={note.id} data={note.data} clickNote={this.clickOnNote}/>
        )}
      </div>
    );
  }
}
