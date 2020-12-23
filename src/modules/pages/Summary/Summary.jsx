// Libraries
import React, { Component } from 'react';

// Component modules
import Title from '../../components/Title/Title';

// Styles
import './Summary.scss';

class Summary extends Component {
  render() {
    return (
      <div className="summary">
        <Title title="Resumen" />
      </div>
    )
  }
}

export default Summary;