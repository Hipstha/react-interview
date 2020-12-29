// Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { getInterviewersAction } from '../../../redux/actions/InterviewerActions';

// Components modules
import Title from '../../components/Title/Title';
import Loading from '../../components/Loading/Loading';
import Register from '../../components/Register/Register';
import Interv from '../../components/Interv/Interv';
import RegisterSmall from '../../components/RegisterSmall/RegisterSmall';
import Error from '../../components/Error/Error';
import { NextButton, NextButtonDisabled } from '../../components/NavButton/NavButtons';


// styles
import './Interviewer.scss';


class Interviewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interviewerData: {
        interviewers: [],
        error: false,
        loading: false
      }
    };
  }

  componentDidMount() {
    this.props.getInterviewersAction();
    this.setState({
      interviewerData: this.props.interviewer
    })
  }

  shouldComponentUpdate(nextProps) {
    if(this.state.interviewerData.loading !== nextProps.interviewer.loading) {
      this.setState({
        interviewerData: this.props.interviewer
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { error, loading, interviewers } = this.state.interviewerData;
    if(error) {
      return (
        <Error />
      )
    }
    return (
      <div className="interviewer animate__animated animate__fadeIn">
        <Title title="Entrevistadores" />

        {
          loading === true ? (<Loading />) : null
        }
        
        {
          interviewers.length === 0 ? 
          (
            <>
              <Register type="entrevistador" />
              <div className="interviewer-footer">
                {/* <PrevButton /> */}
                <NextButtonDisabled />
              </div>
            </>
          ) : 
          (
            <>
              <div className="interviewer-squares">
                {
                  interviewers.map(interv => (
                    <Interv key={interv.id} data={interv} />
                  ))
                }
                <RegisterSmall type="entrevistador" />
              </div>
              <div className="interviewer-footer">
                <NextButtonDisabled />
                <Link to="/candidates">
                  <NextButton />
                </Link>
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
    interviewer: state.interviewer
  }
}

const mapDispatchToProps = () => {
  return {
    getInterviewersAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Interviewer)
