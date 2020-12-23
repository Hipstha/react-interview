// Libraries
import React, { Component } from 'react';

// Components modules
import Title from '../../components/Title/Title';

// styles
import './Questions.scss';

class Questions extends Component {
  render() {
    return (
      <div className="questions">
        <Title title="Preguntas" />
      </div>
    )
  }
}

export default Questions;