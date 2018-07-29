import React, { Component } from 'react';
import './style.css';
import './mobile.css';
class Paginator extends Component {
  constructor(props) {
    super(props);

    let buttons = [1];

    for(let i = 0; buttons.length < 5; i++){
      if(buttons[buttons.length - 1] + 1 <= this.props.count) {
        buttons.push(buttons[buttons.length - 1] + 1);
        continue;
      }
      break;
    }

    this.state = {
      currentButtons: buttons
    }

    this.nextButtons = this.nextButtons.bind(this);
    this.previousButtons = this.previousButtons.bind(this);
  }

  render() {
    let currentButtons = this.state.currentButtons;

    let buttonsToShow = [];
    for(let i = 0; i < currentButtons.length; i++) {
      let buttonClass = this.props.activeButton === currentButtons[i] ? "pagination-button active" : "pagination-button";

      buttonsToShow.push(
        <div key={currentButtons[i]} className={buttonClass} onClick={ () => { this.props.onClick(currentButtons[i]) } }>
          {currentButtons[i]}
        </div>
      );
    }

    return(
      <div className="pagination-wrapper">
        <div className="pagination">
          <div className="pagination-left" onClick={this.previousButtons}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
              <path d="M0-.5h24v24H0z" fill="none"/>
            </svg>
          </div>
          <div className="pagination-buttons">
            {buttonsToShow}
          </div>
          <div className="pagination-right" onClick={this.nextButtons}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
              <path d="M0-.25h24v24H0z" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  nextButtons() {
    let currentButtons = this.state.currentButtons.slice();
    let futureButtons = [];

    for(let i = 0; i < currentButtons.length; i++) {
      if(currentButtons[i] + 5 > this.props.count) {
        break;
      } else {
        futureButtons.push(currentButtons[i] + 5);
      }
    }

    if(futureButtons.length > 0) {
      this.setState({
        currentButtons: futureButtons
      });
    }
  }

  previousButtons() {
    let currentButtons = this.state.currentButtons.slice();
    let futureButtons = [];

    if(currentButtons.length < 5) {
      currentButtons.push(currentButtons[currentButtons.length - 1] + 1);
    }

    for(let i = 0; i < currentButtons.length; i++) {
      if(currentButtons[i] - 5 < 1) {
        break;
      } else {
        futureButtons.push(currentButtons[i] - 5);
      }
    }

    if(futureButtons.length > 0) {
      this.setState({
        currentButtons: futureButtons
      });
    }
  }
}

export default Paginator;
