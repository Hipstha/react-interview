// Libraries
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { getCandidatesAction, updateCandidateFastAction } from '../../../redux/actions/candidateActions';
import { addInterviewAction } from '../../../redux/actions/InterviewActions';
import Error from '../../components/Error/Error';

// Component modules
import Title from '../../components/Title/Title';
import Loading from '../../components/Loading/Loading';

// classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// Styles
import './Summary.scss';

class Summary extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  state = {};
  constructor(props) {
    super(props);
    this.state = { 
      show: false, 
      candidate: {
        candidates: [
          {
            name: '',
            email: '',
            type: '',
            skills: [],
            interviewer: {

            }
          }
        ],
        error: false,
        loading: false
      }
    };
    this.thisProps.setProps(props);
    this.submittedForm = this.submittedForm.bind(this);
  }

  componentDidMount() {
    this.props.getCandidatesAction();
    this.setState({
      candidate: this.props.candidate
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.candidate.loading !== nextProps.candidate.loading) {
      this.setState({
        candidate: nextProps.candidate
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
    this.setState({
      show: true
    });
  }

  submittedForm() {
    const comment = document.getElementById('comment-sum').value;
    const interview = {
      candidate: this.state.candidate.candidates[0],
      comments: comment
    }
    let candidate = this.state.candidate.candidates[0];
    candidate.interviewd = true;
    this.alerts.getConfirmAlert('¿Esta seguro que desea continuar?')
      .then((result) => {
        if(result.isConfirmed) {
          this.props.updateCandidateFastAction(candidate);
          this.props.addInterviewAction(interview);
          setTimeout(() => {
            this.props.history.push('/interview');
          }, 100)
        }
      })
  }

  render() {
    const { error, loading, candidates } = this.state.candidate;
    if(error) {
      return (
        <Error />
      )
    }
    let candidate = {};
    let skills = [];
    if(candidates[0] !== undefined) {
      candidate = candidates[0];
      if(candidate.skills !== undefined) {
        skills = candidate.skills;
      }
    }
    return (
      <>

        {
          loading === true ? (<Loading />): null
        }

        <div className="summary animate__animated animate__fadeIn">
          <Title title="Resumen" />

          <div className="summary-content">

            <div className="row">

              <div className="col">
                <div className="candidate-data">
                  <div className="title">
                    <h3>Datos del candidato</h3>
                  </div>
                  <div className="candidate-name">
                    <div className="label">
                      <p>Nombre completo:</p>
                    </div>
                    <div className="name">
                      <p>{ candidate.name }</p>
                    </div>
                  </div>

                  <div className="candidate-email">
                    <div className="label">
                      <p>Correo electrónico:</p>
                    </div>
                    <div className="email">
                      <p>{ candidate.email }</p>
                    </div>
                  </div>

                  <div className="candidate-type">
                    <div className="label">
                      <p>Type:</p>
                    </div>
                    <div className="type">
                      <p>{ candidate.type }</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">

                <table className="skills">
                  <thead>
                    <tr>
                      <th className="results">Resultados</th>
                      <td className="see-results second">
                        <span onClick={() => this.handleShow()}>Ver resultados</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="head">Skill</td>
                      <td className="score-title second">Puntaje</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      skills.map((skill, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{ skill.name }</td>
                            <td className="second">{ skill.score } / 100</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>


              </div>

            </div>

            <div className="comment-section">
              <div className="comment-header">
                <h3>Comentarios: </h3>
              </div>
              <div className="comment">
                <textarea name="comment" 
                          id="comment-sum" 
                          rows="5"
                ></textarea>
              </div>
            </div>

            <div className="summary-footer">
              <div className="finish-button btn-primary" onClick={this.submittedForm}>
                <p>Finalizar</p>
              </div>
            </div>
          </div>
        </div>


        <Modal className="modal-quest" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-question"></i>
              <strong>   Preguntas</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table border="1" className="question-table">
              <thead>
                <tr>
                  <th>Pregunta</th>
                  <th>Respuesta</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {
                  skills.map(skill => {
                    return skill.questions.map((question, idx) => {
                      return (
                        <tr key={idx}>
                          <td>
                            { question.quest }
                          </td>
                          <td>
                            { question.score }
                          </td>
                          <td>
                            { question.notes }
                          </td>
                        </tr>
                      )
                    })
                  })
                }
              </tbody>
            </table>
          </Modal.Body>
        </Modal>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    interview: state.interview
  }
}

const mapDispatchToProps = () => {
  return {
    getCandidatesAction,
    updateCandidateFastAction,
    addInterviewAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Summary);