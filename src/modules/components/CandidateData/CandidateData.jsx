// Libraries
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// redux
import { connect } from 'react-redux';
import { updateCandidateAction, deleteCandidateAction } from '../../../redux/actions/candidateActions';

// styles
import './CandidateData.scss';

class CandidateData extends Component {
  state = {};
  thisProps = new Props();
  alerts = new Alerts();
  name = '';
  email = '';
  type = '';

  constructor(props) {
    super(props);
    this.thisProps.setProps(props);
    const { id, name, email, skills, interviewd, interviewer, type } = this.thisProps.getProps().data;
    this.state = {
      show: false,
      loading: false,
      candidate: {
        id,
        name,
        email,
        type,
        interviewd,
        skills,
        interviewer
      }
    };
    this.name = name;
    this.email = email;
    this.type = type;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
    this.deleteCandidate = this.deleteCandidate.bind(this);
  }

  componentDidMount() {
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
    if (this.state.loading !== nextProps.candidate.loading) {
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
    this.setState({
      show: true
    });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      candidate: {
        ...this.state.candidate,
        [name]: value
      }
    })
  }

  submittedForm(e) {
    e.preventDefault();
    const id = this.state.candidate.id;
    const name = this.state.candidate.name;
    const email = this.state.candidate.email;
    const type = this.state.candidate.type;
    const skills = this.state.candidate.skills;
    const interviewer = this.state.candidate.interviewer;
    const interviewd = this.state.candidate.interviewd;
    if(id === '' || name === '' || email === '' || type === '') {
      this.alerts.getErrorAlert('Todos los campos son obligatorios');
      return;
    }
    this.props.updateCandidateAction({
      id,
      name,
      email,
      type,
      skills,
      interviewd,
      interviewer
    });
    this.name = name;
    this.email = email;
    this.type = type;
  }

  deleteCandidate() {
    this.props.deleteCandidateAction(this.state.candidate.id);
  }

  render() {

    const interviewd = this.state.candidate.interviewd;
    
    return (
      <>
        <article className="candidate-data animate__animated animate__fadeIn">
          <div className="candidate-container" onClick={this.handleShow}>
            <div className="data-header">
              <div className="icon">
                <i className="far fa-user"></i>
              </div>
              <div className="data-name">
                <div className="label">
                  <p>Nombre completo</p>
                </div>
                <div className="name">
                  <p><strong>{ this.name }</strong></p>
                </div>
              </div>
            </div>
            <div className="email-label">
              <p>Correo electrónico</p>
            </div>
            <div className="email">
              <p><strong>{ this.email }</strong></p>
            </div>
            <div className="type-label">
              <p>Tipo</p>
            </div>
            <div className="type">
              <p><strong>{ this.type }</strong></p>
            </div>
          </div>
        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-edit"></i>
              <strong>
                <span> Modificar candidato</span> 
              </strong>
            </Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.submittedForm}>
            <Modal.Body>
              <Form.Group controlId="candidateName">
                <Form.Label><strong>Nombre completo</strong></Form.Label>
                <Form.Control className="form-input" 
                              type="text" 
                              placeholder="Nombre del candidato" 
                              name="name"
                              onChange={this.handleChange}
                              value={this.state.candidate.name}
                              disabled={interviewd}
                />
              </Form.Group>

              <Form.Group controlId="employeeId">
                <Form.Label><strong>Correo electrónico</strong></Form.Label>
                <Form.Control className="form-input" 
                              type="email" 
                              placeholder="Ingrese el email del candidato"
                              name="email"
                              onChange={this.handleChange}
                              value={this.state.candidate.email}
                              disabled={interviewd}
                />
              </Form.Group>

              <Form.Group controlId="employeeEID">
                <Form.Label><strong>Tipo</strong></Form.Label>
                <Form.Control as="select"
                              className="form-input"
                              name="type"
                              onChange={this.handleChange}
                              value={this.state.candidate.type}
                              disabled={interviewd}
                >
                  <option value="">Seleccionar</option>
                  <option value="Interno">Interno</option>
                  <option value="Contractor">Contractor</option>
                </Form.Control>
              </Form.Group>
            
            </Modal.Body>

            <Modal.Footer className="footer-interv">
              <Button onClick={this.deleteCandidate} variant="danger" className="delete-interv" type="button">
                Eliminar
              </Button>
              {
                interviewd === true ?
                (
                  <Button variant="secondary" type="button" disabled={interviewd}>
                    Editar
                  </Button>
                ) :
                (
                  <Button variant="primary" type="submit">
                    Editar
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
    candidate: state.candidate
  }
}

const mapDispatchToProps = () => {
  return {
    updateCandidateAction,
    deleteCandidateAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(CandidateData);