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
    const { id, name, email, type, skills, interviewer } = this.thisProps.getProps().data;
    this.state = { 
      show: false,
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
        interviewer
      },
      skillsToEval: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
  }

  componentDidMount() {
    this.props.getSkillsAction();
  }

  shouldComponentUpdate(nextProp) {
    if (this.state.skills.loading !== nextProp.skills.loading) {
      this.setState({
        skills: this.props.skills
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
      interviewer
    });

    this.setState({
      candidate: {
        id,
        name,
        email,
        type,
        skills,
        interviewer
      }
    });
    
    this.handleClose();

  }

  render() {
    const { loading } = this.state.skills;
    const candidateSkills = this.state.candidate.skills;
    const skillsToEval = this.state.skillsToEval;

    return (
      <>
        {
          loading === true ? (<Loading />): null
        }

        <article className="skills">
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
                        <li key={skill.id}>{ skill.name }</li>
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
                          />
                        </Form.Group>
                      </div>
                    ))
                  }
                </div>
                

            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
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