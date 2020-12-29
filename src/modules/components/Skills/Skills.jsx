// libraries
import React, { Component, Fragment} from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

// redus
import { connect } from 'react-redux';
import { updateCandidateFastAction, getCandidatesAction } from '../../../redux/actions/candidateActions';
import { getSkillsAction } from '../../../redux/actions/SkillsActions';

// classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// components
import Loading from '../Loading/Loading';

// styles
import './Skills.scss';

class Skills extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  state = {};
  skillsToEval = [];
  constructor(props) {
    super(props);
    this.thisProps.setProps(props);
    const { id, name, email, type, skills, interviewd, interviewer } = this.thisProps.getProps().data;
    this.state = { 
      show: false,
      loading: false,
      skills: {
        skills: [],
        error: false,
        loading: false
      },
      candidate: {
        id,
        name,
        email,
        type,
        skills,
        interviewer,
        interviewd
      },
      skillsToEval: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  componentDidMount() {
    this.props.getSkillsAction();
    const { id, name, email, interviewd, skills, interviewer, type } = this.thisProps.getProps().data;
    this.setState({
      candidate: {
        id,
        name,
        email,
        interviewd,
        skills,
        type,
        interviewer
      }
    })
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.skills.loading !== nextProps.skills.loading) {
      this.setState({
        skills: this.props.skills
      });
    }
    if ( this.state.loading !== nextProps.candidate.loading ) {
      this.setState({
        candidate: this.props.candidate.candidates[0],
        loading: this.props.candidate.loading
      });
    }
    return true;
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow() {
    const { skills } = this.state.skills;
    const candidateSkills = this.state.candidate.skills;
    const skillsToEval = skills.map(skill => {
      skill.isSet = false;
      candidateSkills.map(canSkill => {
        if (skill.name === canSkill.name) {
          skill.isSet = true;
        }
        return canSkill
      })
      return skill;
    });
    this.setState({
      show: true,
      skillsToEval
    });
  }

  submittedForm(e) {
    e.preventDefault();
    const skillsToEval = this.state.skillsToEval;
    const checkeds = skillsToEval.map(skill => {
      const element = document.getElementById(skill.name);
      if(element.checked === true) {
        return skill;
      } else {
        return undefined;
      }
    });
    const checkedsFilter = checkeds.filter(checked => {
      return checked !== undefined;
    });
    const skillsToSend = checkedsFilter.map(skill => {
      delete skill.isSet;
      skill.questions = skill.questions.map( question => {
        question.score = '';
        question.notes = '';
        return question;
      })
      return skill;
    });
    const id = this.state.candidate.id;
    const name = this.state.candidate.name;
    const email = this.state.candidate.email;
    const type = this.state.candidate.type;
    const skills = skillsToSend;
    const interviewer = this.state.candidate.interviewer;
    const interviewd = this.state.candidate.interviewd
    if(
      id === '' ||
      name === '' ||
      email === '' ||
      type === '' ||
      skills.length === 0 ||
      interviewer === null
    ) {
      this.alerts.getErrorAlert('Debe seleccionar por lo menos uno');
      return;
    }

    this.props.updateCandidateFastAction({
      id,
      name,
      email,
      type,
      skills,
      interviewer,
      interviewd
    });

    this.setState({
      candidate: {
        id,
        name,
        email,
        type,
        skills,
        interviewer,
        interviewd
      }
    });
    
    this.handleClose();

  }

  render() {
    const { loading } = this.state.skills;
    const candidateSkills = this.state.candidate.skills;
    const skillsToEval = this.state.skillsToEval;
    const interviewd = this.state.candidate.interviewd;
    // console.log(interview)
    return (
      <>
        {
          loading === true ? (<Loading />): null
        }

        <article className="skills animate__animated animate__fadeIn">
          <div className="skills-container">
            <div className="title">
              <h2>Skills a evaluar: </h2>
            </div>

            {
              candidateSkills.length === 0 ? (
                <div className="select-skills">
                  <div className="select-skills-container" 
                      onClick={() => this.handleShow()}
                  >
                    <div className="head-select">
                      <p>No se han seleccioando skills</p>
                    </div>
                    <div className="icon">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <div className="footer-select">
                      <p>Haz click para añadir</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="skills-list" onClick={this.handleShow}>
                  <ul>
                    {
                      candidateSkills.map( skill => (
                        <li className="animate__animated animate__fadeIn" key={skill.id}>{ skill.name }</li>
                      ))
                    }
                  </ul>
                </div>
              )
            }

          </div>
        </article>

        <Modal className="skill-modal" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-laptop-code"></i>
              <strong> Skills a evaluar</strong>
            </Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.submittedForm}>
            <Modal.Body>

                <div className="row">
                  {
                    skillsToEval.map((skill, idx) => (
                      <div key={skill.id}  className="col-md-6 col-12">
                        <Form.Group>
                          <Form.Check type="checkbox" 
                                      id = {skill.name}
                                      label={skill.name}
                                      className={skill.name}
                                      name={skill.name}
                                      defaultChecked={skill.isSet}
                                      disabled={interviewd}
                          />
                        </Form.Group>
                      </div>
                    ))
                  }
                </div>
                

            </Modal.Body>
            <Modal.Footer>
              {
                  interviewd === true ?
                  (
                    <Button variant="secondary" type="button" disabled={interviewd}>
                      Guardar
                    </Button>
                  ) :
                  (
                    <Button variant="primary" type="submit">
                      Guardar
                    </Button>
                  )
                }
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    skills: state.skills
  }
};

const mapDispatchToProps = () => {
  return { 
    getCandidatesAction,
    updateCandidateFastAction,
    getSkillsAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Skills);