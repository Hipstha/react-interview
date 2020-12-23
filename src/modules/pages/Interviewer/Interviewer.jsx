// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components modules
import Title from '../../components/Title/Title';
import Register from '../../components/Register/Register';
import Interv from '../../components/Interv/Interv';
import RegisterSmall from '../../components/RegisterSmall/RegisterSmall';
import { NextButton, NextButtonDisabled } from '../../components/NavButton/NavButtons';

// styles
import './Interviewer.scss';


class Interviewer extends Component {
  render() {
    const interv = {
      name: 'Alejandro Cruz',
      userId: 123456,
      EID: 'daniel.cruz.perez'
    }
    return (
      <div className="interviewer">
        <Title title="Entrevistadores" />

        <Register type="entrevistador" />

        <div className="interviewer-squares">
          <Interv data={interv} />

          <RegisterSmall type="entrevistador" />
        </div>

        <div className="interviewer-footer">
          {/* <PrevButton /> */}
          <NextButtonDisabled />
          <Link to="/candidates">
            <NextButton />
          </Link>
        </div>
      </div>
    )
  }
}

export default Interviewer;
