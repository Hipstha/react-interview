// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components modules
import Title from '../../components/Title/Title';
import Register from '../../components/Register/Register';
import CandidateData from '../../components/CandidateData/CandidateData';
import Skills from '../../components/Skills/Skills';
import { NextButton, NextButtonDisabled, PrevButton } from '../../components/NavButton/NavButtons';

// styles
import './Candidate.scss';

class Candidate extends Component {
  render() {
    const candidate = {
      name: 'Daniel Alejandro Cruz Pérez',
      email: 'alex_crz97@hotmail.com',
      type: 'Interno'
    }
    
    const skills = [];

    return (
      <div className="candidate">
        <Title title="Candidatos" />

        <Register type="candidato" />

        <div className="candidate-body">
          <CandidateData data={candidate} />

          <Skills data={skills} />
        </div>

        <div className="candidate-footer">

          <Link to="/interviewers">
            <PrevButton />
          </Link>

          <NextButtonDisabled />

          <Link to="/questions">
            <NextButton />
          </Link>

        </div>
      </div>
    )
  }
}

export default Candidate;