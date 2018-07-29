import React, { Component } from 'react';

import './style.css';
class InfoBox extends Component {
  render() {
    let classString = null;
    if(this.props.show){
      classString = "mx-infobox-content show " + this.props.boxType;
    }else {
      classString = "mx-infobox-content " + this.props.boxType;
    }

    let messages = this.props.message


    return(
      <div className="mx-infobox-wrapper">
        <div className={classString}>

          <div onClick={this.props.onClickHandler}><div style={{padding: '20px',margin: 0}}>{messages}</div></div>
        </div>
      </div>
    );
  }
}

export default InfoBox;
