// Libraries
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { getCandidatesAction } from '../../../redux/actions/candidateActions';

// Components modules
import Title from '../../components/Title/Title';
import Register from '../../components/Register/Register';
import CandidateData from '../../components/CandidateData/CandidateData';
import Skills from '../../components/Skills/Skills';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { NextButton, NextButtonDisabled, PrevButton } from '../../components/NavButton/NavButtons';

// styles
import './Candidate.scss';

class Candidate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      candidateData: {
        candidates: [],
        error: false,
        loading: false
      }
    };
  }

  componentDidMount() {
    this.props.getCandidatesAction();
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.candidateData.loading !== nextProps.candidate.loading) {
      this.setState({
        candidateData: this.props.candidate
      });
      return true;
    } else {
      return false;
    }
  }

  render() {

    const { error, loading, candidates } = this.state.candidateData;
    if(error) {
      return (
        <Error />
      )
    }
    return (
      <div className="candidate animate__animated animate__fadeIn">
        <Title title="Candidatos" />

        {
          loading === true ? (<Loading />): null
        }

        {
          (candidates.length === 0) ?
          (
            <>
              <Register type="candidato" />
              <div className="candidate-footer">
                <Link to="/interviewers">
                  <PrevButton />
                </Link>
                <NextButtonDisabled />
              </div>
            </>
          ) :
          (
            <>
              <div className="candidate-body">
                {
                  candidates.map((candidate, idx) => (
                    <Fragment key={candidate.id}>
                      <CandidateData data={candidate} />
                      <Skills data={candidate} />
                    </Fragment>
                  ))
                }
              </div>
              <div className="candidate-footer">
                <Link to="/interviewers">
                  <PrevButton />
                </Link>
                {
                  candidates[0].skills.length === 0 ? 
                  (
                    <NextButtonDisabled />
                  ) : (
                    <Link to="/questions">
                      <NextButton />
                    </Link>
                  )
                }
                
              </div>
            </>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate
  }
}

const mapDispatchToProps = () => {
  return {
    getCandidatesAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Candidate);