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
import './Register.scss';

class Register extends Component {

  thisProps = new Props();
  alerts = new Alerts();
  type = '';

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
    this.type = this.thisProps.getProps().type;
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  submittedForm(e) {
    e.preventDefault();
    if(this.type === 'entrevistador') {
      const name = this.state.interviewer.name;
      const employeeId = this.state.interviewer.employeeId;
      const employeeEID = this.state.interviewer.employeeEID;
      if (name === '' || employeeId === '' || employeeEID === '' ) {
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
      this.handleClose();
    }
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
    return (
      <section className="register">
        <article className="register-container">

          <div className="register-title">
            <h2>
              No se ha registrado ningún { this.type }
            </h2>
          </div>

          <div className="add-type" onClick={ () => this.handleShow() }>
            <div className="icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="sub-title">
              <p>Haz click aquí para añadir</p>
            </div>
          </div>

        </article>

        <Modal className="modal-interviewer" show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-user-plus"></i>
              <strong>
              { this.type === 'entrevistador' ? 
                <span> Nuevo entrevistador</span> : 
                <span> Datos del candidato</span>
              }
              </strong>
            </Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.submittedForm}>
            <Modal.Body>

              {
                this.type === 'entrevistador' ?
                (
                  <div>
                    <Form.Group>
                      <Form.Label><strong>Nombre completo</strong></Form.Label>
                      <Form.Control id="employeeName"
                                    name="name" 
                                    className="form-input" 
                                    type="text" 
                                    placeholder="Ingrese el nombre"
                                    onChange={this.handleChange}
                                    value={this.state.interviewer.name}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label><strong>Id del empleado</strong></Form.Label>
                      <Form.Control id="employeeId"
                                    name="employeeId" 
                                    className="form-input" 
                                    type="number" 
                                    placeholder="Ingrese el id del empleado"
                                    onChange={this.handleChange}
                                    value={this.state.interviewer.employeeId}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label><strong>EID</strong></Form.Label>
                      <Form.Control id="employeeEID" 
                                    name="employeeEID"
                                    className="form-input" 
                                    type="text" 
                                    placeholder="Ingrese el EID"
                                    onChange={this.handleChange}
                                    value={this.state.interviewer.employeeEID}
                      />
                    </Form.Group>
                  </div>
                ) :
                (
                  <div>
                    <Form.Group controlId="candidateName">
                      <Form.Label><strong>Nombre completo</strong></Form.Label>
                      <Form.Control className="form-input" type="text" placeholder="Nombre del candidato" />
                    </Form.Group>

                    <Form.Group controlId="employeeId">
                      <Form.Label><strong>Correo electrónico</strong></Form.Label>
                      <Form.Control className="form-input" type="email" placeholder="Ingrese el email del candidato" />
                    </Form.Group>

                    <Form.Group controlId="employeeEID">
                      <Form.Label><strong>Tipo</strong></Form.Label>
                      <Form.Control as="select" className="form-input">
                        <option value="">Seleccionar</option>
                        <option value="Interno">Interno</option>
                        <option value="Contractor">Contractor</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                )
              }

              

            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </section>

      
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

export default connect(mapStateToProps, mapDispatchToProps())(Register);