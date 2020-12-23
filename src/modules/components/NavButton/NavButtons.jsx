// libraries 
import React, { Component } from 'react';

// Styles
import './NavButtons.scss';

export class NextButton extends Component {
  render() {
    return (
      <div className="next-page">
        <span>Continuar </span> 
        <i className="fas fa-arrow-right"></i>
      </div>
    )
  }
}

export class NextButtonDisabled extends Component {
  render() {
    return (
      <div className="next-page disabled">
        <span>Continuar </span> 
        <i className="fas fa-arrow-right"></i>
      </div>
    )
  }
}

export class PrevButton extends Component {
  render() {
    return (
      <div className="prev-page">
        <i className="fas fa-arrow-left"></i>
        <span> Continuar</span> 
      </div>
    )
  }
}