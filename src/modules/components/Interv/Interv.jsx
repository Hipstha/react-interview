// Libraries
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// redux
import { connect } from 'react-redux';
import { deleteInterviewerAction, updateInterviewerActions } from '../../../redux/actions/InterviewerActions';

// Styles
import './Interv.scss';

class Interv extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  name = '';
  employeeId = '';
  employeeEID = '';

  constructor(props) {
    super(props);
    this.thisProps.setProps(props.data);
    const { id, name, employeeId, employeeEID } = this.thisProps.getProps();
    this.state = {
      show: false,
      interviewer: {
        id,
        name,
        employeeId,
        employeeEID
      }
    };
    this.name = name;
    this.employeeEID = employeeEID;
    this.employeeId = employeeId;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submittedForm = this.submittedForm.bind(this);
    this.deleteIntrv = this.deleteIntrv.bind(this);
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

  submittedForm(e) {
    e.preventDefault();
    const id = this.state.interviewer.id;
    const name = this.state.interviewer.name;
    const employeeId = this.state.interviewer.employeeId;
    const employeeEID = this.state.interviewer.employeeEID;
    if(name === '' || employeeId === '' || employeeEID === '') {
      this.alerts.getErrorAlert('Todos los campos son obligatorios')
    }
    this.props.updateInterviewerActions({
      id,
      name,
      employeeId,
      employeeEID
    });
    this.name = name;
    this.employeeEID = employeeEID;
    this.employeeId = employeeId;
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      interviewer: {
        ...this.state.interviewer,
        [name]: value
      }
    })
  }

  deleteIntrv() {
    this.props.deleteInterviewerAction(this.state.interviewer.id);
  }

  render() {
    return (
      <>
        <article className="interviewer-square animate__animated animate__fadeIn" onClick={this.handleShow}>
          <div className="icon">
            <i className="far fa-user"></i>
          </div>
          <div className="name">
            <p><strong>{ this.name }</strong></p>
          </div>
          <div className="employeeId">
            <p>#{ this.employeeId }</p>
          </div>
          <div className="userEid">
            <p>{ this.employeeEID }</p>
          </div>
        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-edit"></i>
              <strong> Modificar datos del entrevistador</strong>
            </Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.submittedForm}>
            <Modal.Body>

              <Form.Group controlId="employeeName">
                <Form.Label><strong>Nombre completo</strong></Form.Label>
                <Form.Control className="form-input" 
                              type="text" 
                              placeholder="Ingrese el nombre"
                              name="name"
                              onChange={this.handleChange}
                              value={this.state.interviewer.name}
                />
              </Form.Group>

              <Form.Group controlId="employeeId">
                <Form.Label><strong>Id del empleado</strong></Form.Label>
                <Form.Control className="form-input" 
                              type="text" 
                              placeholder="Ingrese el id del empleado"
                              name="employeeId"
                              onChange={this.handleChange}
                              value={this.state.interviewer.employeeId}
                />
              </Form.Group>

              <Form.Group controlId="employeeEID">
                <Form.Label><strong>EID</strong></Form.Label>
                <Form.Control className="form-input" 
                              type="text" 
                              placeholder="Ingrese el EID"
                              name="employeeEID"
                              onChange={this.handleChange}
                              value={this.state.interviewer.employeeEID}
                />
              </Form.Group>

            </Modal.Body>

            <Modal.Footer className="footer-interv">
              <Button onClick={this.deleteIntrv} variant="danger" className="delete-interv" type="button">
                Eliminar
              </Button>
              <Button variant="primary" type="submit">
                Editar
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
    interviewer: state.interviewer
  }
};

const mapDispatchToProps = () => {
  return {
    deleteInterviewerAction,
    updateInterviewerActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Interv);