import React, { Component } from 'react';

import { Spinner } from 'react-bootstrap';
import './Loading.scss';

class Loading extends Component {
  render() {
    return(
      <div className="spinner-container">
        <Spinner animation="grow" className="loading-spinner" />
      </div>
    )
  }
}

export default Loading;