import React, { Component } from 'react';

import './style.css';

class MxModal extends Component {
  constructor(props){
    super(props);
    this.closeDialogOnBlur = this.closeDialogOnBlur.bind(this);
  }

  render() {
    if(this.props.show){
      //document.body.style.overflow = "hidden";
    } else {
      //document.body.style.overflow = "auto";
    }



    return(
      <div className={this.props.show ? "mx-modal-fixed-wrapper show" : "mx-modal-fixed-wrapper"} onClick={this.closeDialogOnBlur}>
        <div className="mx-modal-abs-wrapper">
          <div className="mx-modal-div-wrapper">
            <div className="mx-modal-content-wrapper">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeDialogOnBlur() {
    if(this.props.closeOnBlur){
      this.props.closeCallback();
    }
  }
}

export default MxModal;
