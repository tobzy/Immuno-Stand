import React, { Component } from 'react';

import './style.css';

class Checkbox extends Component {
  render() {
    return (

      <div className={this.props.active ? "mx-checkbox active" : "mx-checkbox"} onClick={this.props.onClickHandler} style={this.props.style}>
        <span></span>
      </div>
    );
  }
}

export default Checkbox;
