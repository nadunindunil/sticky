import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCircle from "@fortawesome/fontawesome-free-solid/faMinusCircle";
import faWindowClose from "@fortawesome/fontawesome-free-solid/faWindowClose";

export default class Note extends Component {
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
    this.props.clickNote(this.props.data);
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

            {this.props.data}
          </div>
        </div>
      </div>
    );
  }
}
