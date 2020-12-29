// Libraries
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

// redux
import { connect } from 'react-redux';
import { getInterviewesAction } from '../../../redux/actions/InterviewActions';

// Component modules
import Title from '../../components/Title/Title';
import Loading from '../../components/Loading/Loading';

// classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// Styles
import './Interview.scss';

class Interview extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  state = {};
  constructor(props) {
    super(props);
    this.state = { 
      show: false, 
      interview: {
        loading: false,
        error: false,
        interviews: []
      }
    };
    this.thisProps.setProps(props);
  }

  componentDidMount() {
    this.props.getInterviewesAction();
    this.setState({
      interview: this.props.interview
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.interview.loading !== nextProps.interview.loading) {
      this.setState({
        interview: nextProps.interview
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

  render() {
    const { loading, interviews } = this.state.interview;
    let comments = '';
    let candidate = [];
    let skills = [];
    if(interviews !== undefined && interviews.length !== 0) {
      let thisInterview = interviews.length-1;
      comments = interviews[thisInterview].comments;
      candidate = interviews[thisInterview].candidate;
      skills = interviews[thisInterview].candidate.skills;
    }
    return (
      <>

        {
          loading === true ? (<Loading />): null
        }

        <div className="summary">
          <Title title="Resultados de entrevista" />

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
                <p>
                  { comments }
                </p>
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
    interview: state.interview
  }
}

const mapDispatchToProps = () => {
  return {
    getInterviewesAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Interview);