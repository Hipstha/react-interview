// Libraries
import React, { Component } from 'react';

// classes
import Props from '../../../Classes/Props';

class Title extends Component {

  thisProps = new Props();

  constructor(props) {
    super(props);
    this.state = {};
    this.thisProps.setProps(props);
  }

  render() {
    const { title } = this.thisProps.getProps();
    return (
      <>
        <div className="title">
          <h1>{ title }</h1>
        </div>
      </>
    )
  }
}

export default Title;