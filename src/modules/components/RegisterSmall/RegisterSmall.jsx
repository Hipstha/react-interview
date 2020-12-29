// libraries
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// classes
import Props from '../../../Classes/Props';
import Alerts from '../../../Classes/Alerts';

// redux
import { connect } from 'react-redux';
import { addInterviewerAction } from '../../../redux/actions/InterviewerActions';

// styles
import './RegisterSmall.scss';

class RegisterSmall extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      interviewer: {
        name: '',
        employeeId: '',
        employeeEID: ''
      }
    };
    this.submittedForm = this.submittedForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.thisProps.setProps(props);
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
    const name = this.state.interviewer.name;
    const employeeId = this.state.interviewer.employeeId;
    const employeeEID = this.state.interviewer.employeeEID;
    if(name === '' || employeeId === '' || employeeEID === '') {
      this.alerts.getErrorAlert('Todos los campos son obligatorios');
      return;
    }
    this.props.addInterviewerAction(
      {
        name,
        employeeId,
        employeeEID
      }
    );
    this.setState({
      interviewer: {
        name: '',
        employeeId: '',
        employeeEID: ''
      }
    })
    this.handleClose();
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      show: this.state.show,
      interviewer: {
        ...this.state.interviewer,
        [name]: value
      }
    });
  }


  render() {
    const { type } = this.thisProps.getProps();
    return (
      <>
        <article className="registerSmall animate__animated animate__fadeIn" onClick={ () => this.handleShow() }>
          <div className="icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="text">
            <p>Haz click aquí para añadir a otro { type }</p>
          </div>
        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-plus"></i>
              <strong> Nuevo entrevistador</strong>
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
    interviewer: state.interviewer
  }
}

const mapDispatchToProps = () => {
  return {
    addInterviewerAction
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(RegisterSmall);