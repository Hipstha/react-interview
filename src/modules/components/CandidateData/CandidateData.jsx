// Libraries
import React, { Component } from 'react';
import Props from '../../../Classes/Props';

// styles
import './CandidateData.scss';

class CandidateData extends Component {
  state = {};
  thisProps = new Props();

  constructor(props) {
    super(props);
    this.state = {};
    this.thisProps.setProps(props);
  }
  render() {
    const { name, email, type } = this.thisProps.getProps().data;
    return (
      <article className="candidate-data">
        <div className="candidate-container">
          <div className="data-header">
            <div className="icon">
              <i className="far fa-user"></i>
            </div>
            <div className="data-name">
              <div className="label">
                <p>Nombre completo</p>
              </div>
              <div className="name">
                <p><strong>{ name }</strong></p>
              </div>
            </div>
          </div>
          <div className="email-label">
            <p>Correo electrónico</p>
          </div>
          <div className="email">
            <p><strong>{ email }</strong></p>
          </div>
          <div className="type-label">
            <p>Tipo</p>
          </div>
          <div className="type">
            <p><strong>{ type }</strong></p>
          </div>
        </div>
      </article>
    )
  }
}

export default CandidateData;