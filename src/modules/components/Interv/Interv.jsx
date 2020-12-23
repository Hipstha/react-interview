// Libraries
import React, { Component } from 'react';

// Classes
import Props from '../../../Classes/Props';

// Styles
import './Interv.scss';

class Interv extends Component {

  thisProps = new Props();
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
    this.thisProps.setProps(props);
  }

  render() {
    const { name, userId, EID } = this.thisProps.getProps().data;
    return (
      <article className="interviewer-square">
        <div className="icon">
          <i className="far fa-user"></i>
        </div>
        <div className="name">
          <p><strong>{ name }</strong></p>
        </div>
        <div className="employeeId">
          <p>#{ userId }</p>
        </div>
        <div className="userEid">
          <p>{ EID }</p>
        </div>
      </article>
    )
  }
}

export default Interv;